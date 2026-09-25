/**
 * Abuse protection for public, unauthenticated form endpoints.
 *
 * Software's own storefront forms are guarded by hCaptcha, but that is injected
 * into Liquid themes through `content_for_header` and does not exist in
 * Hydrogen. These helpers rebuild the equivalent defence in layers, each cheap
 * enough to run before any Admin API call is made:
 *
 *   1. Same-origin check      — rejects cross-site posts (CSRF-style abuse).
 *   2. Body type + size cap   — refuses anything but a small form payload.
 *   3. Per-IP rate limit      — throttles scripted floods.
 *   4. Signed form token      — proves the page was loaded, times the fill,
 *                               and cannot be replayed.
 *   5. CAPTCHA (Turnstile)    — enforced whenever its secret is configured.
 *   6. Per-email rate limit   — stops one address being targeted repeatedly.
 *
 * Server-only. The `.server.ts` suffix keeps it out of the client bundle.
 */

type SecurityEnv = {
  SESSION_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
};

/* =========================================================
   RESPONSES
   ========================================================= */

export function secureJsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow',
      ...extraHeaders,
    },
  });
}

/* =========================================================
   REQUEST ORIGIN
   ========================================================= */

/**
 * The visitor's IP as reported by the edge. `oxygen-buyer-ip` is set by
 * Oxygen itself and cannot be supplied by the client; `x-forwarded-for` is
 * deliberately ignored because anyone can send it.
 *
 * Returns `null` in local development, where no edge sits in front.
 */
export function getClientIp(request: Request) {
  return (
    request.headers.get('oxygen-buyer-ip') ||
    request.headers.get('cf-connecting-ip') ||
    null
  );
}

/**
 * True when the request was sent by a page on this same site.
 *
 * Browsers set `Sec-Fetch-Site` themselves and scripts cannot forge it, so it
 * is trusted first. Older browsers fall back to comparing `Origin` with the
 * host the request arrived on. A POST with neither header did not come from a
 * browser form and is refused.
 */
export function isSameOriginRequest(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site');

  if (fetchSite) {
    return fetchSite === 'same-origin';
  }

  const origin = request.headers.get('origin');

  if (!origin) {
    return false;
  }

  try {
    const originHost = new URL(origin).host;

    return (
      originHost === new URL(request.url).host ||
      originHost === request.headers.get('host')
    );
  } catch {
    return false;
  }
}

/* =========================================================
   BODY PARSING
   ========================================================= */

export class FormBodyError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415,
  ) {
    super(message);
  }
}

const FORM_CONTENT_TYPES = [
  'multipart/form-data',
  'application/x-www-form-urlencoded',
];

/**
 * Parses form data without ever buffering more than `maxBytes`.
 *
 * `request.formData()` reads the whole body into memory first, so a
 * multi-megabyte post would be accepted before any validation ran. This
 * streams the body and aborts the moment the cap is crossed — including for
 * chunked uploads that send no `Content-Length` at all.
 */
export async function readFormDataWithLimit(
  request: Request,
  maxBytes: number,
) {
  const contentType = request.headers.get('content-type') ?? '';

  if (!FORM_CONTENT_TYPES.some((type) => contentType.startsWith(type))) {
    throw new FormBodyError('Unsupported content type.', 415);
  }

  const declaredLength = Number(request.headers.get('content-length'));

  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new FormBodyError('Submission is too large.', 413);
  }

  if (!request.body) {
    throw new FormBodyError('Empty submission.', 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const {done, value} = await reader.read();

    if (done) break;

    received += value.byteLength;

    if (received > maxBytes) {
      await reader.cancel();
      throw new FormBodyError('Submission is too large.', 413);
    }

    chunks.push(value);
  }

  const body = new Uint8Array(received);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return await new Response(body, {
      headers: {'content-type': contentType},
    }).formData();
  } catch {
    throw new FormBodyError('Malformed submission.', 400);
  }
}

/* =========================================================
   TEXT HYGIENE
   ========================================================= */

/*
 * Control characters, zero-width characters and bidi overrides. None belong
 * in a name or URL; they are used to disguise spam, spoof how text renders in
 * the admin, and inject line breaks into notes and email headers.
 */
const UNSAFE_CHARACTERS =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u001F\u007F-\u009F\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

/** Reads a single-line text field: normalised, stripped and whitespace-collapsed. */
export function readCleanField(form: FormData, name: string) {
  const value = form.get(name);

  if (typeof value !== 'string') {
    return '';
  }

  return value
    .normalize('NFKC')
    .replace(UNSAFE_CHARACTERS, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** `jane.doe@example.com` → `ja***@example.com`, so logs don't hold full PII. */
export function maskEmail(email: string) {
  const at = email.lastIndexOf('@');

  if (at < 1) return '***';

  return `${email.slice(0, Math.min(2, at))}***${email.slice(at)}`;
}

/* =========================================================
   HASHING / SIGNING
   ========================================================= */

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';

  for (const byte of view) binary += String.fromCharCode(byte);

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));

  const bytes = new Uint8Array(new ArrayBuffer(binary.length));

  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return bytes;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['sign', 'verify'],
  );
}

/* =========================================================
   RATE LIMITING
   ========================================================= */

type RateLimitRule = {
  /** Namespaces the counter, e.g. `audit-signup:ip`. */
  bucket: string;
  /** What is being counted — an IP, an email. Hashed before storage. */
  identifier: string;
  limit: number;
  windowSeconds: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const RATE_LIMIT_CACHE = 'form-rate-limit';

/**
 * Fixed-window counter stored in the worker's Cache API.
 *
 * Oxygen exposes no KV or Durable Objects, so the cache is the only shared
 * state available. It is per edge location and best effort: a determined,
 * distributed attacker can spread requests across locations, which is what
 * the CAPTCHA layer is for. Identifiers are SHA-256 hashed so no IP or email
 * address is ever written to the cache.
 *
 * Fails open — if the cache is unavailable a real visitor is never locked out.
 */
export async function consumeRateLimit(
  request: Request,
  rule: RateLimitRule,
): Promise<RateLimitResult> {
  try {
    const cache = await caches.open(RATE_LIMIT_CACHE);
    const key = new Request(
      new URL(
        `/__rate-limit/${rule.bucket}/${await sha256Hex(rule.identifier)}`,
        request.url,
      ),
    );

    const now = Date.now();
    let count = 0;
    let resetAt = now + rule.windowSeconds * 1000;

    const cached = await cache.match(key);

    if (cached) {
      const state = (await cached.json()) as {count?: number; resetAt?: number};

      if (
        typeof state.count === 'number' &&
        typeof state.resetAt === 'number' &&
        state.resetAt > now
      ) {
        count = state.count;
        resetAt = state.resetAt;
      }
    }

    const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));

    if (count >= rule.limit) {
      return {allowed: false, retryAfterSeconds};
    }

    await cache.put(
      key,
      new Response(JSON.stringify({count: count + 1, resetAt}), {
        headers: {
          'content-type': 'application/json',
          'cache-control': `max-age=${retryAfterSeconds}`,
        },
      }),
    );

    return {allowed: true, retryAfterSeconds: 0};
  } catch (error) {
    console.error(
      `[form-security] Rate limiter unavailable for "${rule.bucket}"; allowing request. Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );

    return {allowed: true, retryAfterSeconds: 0};
  }
}

/* =========================================================
   SIGNED FORM TOKEN
   ========================================================= */

/**
 * A token the page fetches when the form mounts and posts back on submit:
 * `v1.<issuedAt>.<nonce>.<signature>`, HMAC-signed with SESSION_SECRET.
 *
 * - It proves the submitter loaded the form rather than posting blind.
 * - `issuedAt` gives a trustworthy fill time: bots that submit within a
 *   couple of seconds are dropped, and they cannot backdate a signed value.
 * - The nonce is spent on use, so one token cannot drive repeated posts.
 */
export type FormTokenCheck =
  | {ok: true; nonce: string}
  | {ok: false; reason: 'missing' | 'invalid' | 'expired' | 'too-fast'};

const TOKEN_VERSION = 'v1';

function tokenPayload(purpose: string, issuedAt: string, nonce: string) {
  return `${purpose}|${TOKEN_VERSION}|${issuedAt}|${nonce}`;
}

export async function createFormToken(env: SecurityEnv, purpose: string) {
  if (!env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not set; cannot sign form tokens.');
  }

  const issuedAt = String(Date.now());
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(16)));
  const key = await importHmacKey(env.SESSION_SECRET);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(tokenPayload(purpose, issuedAt, nonce)),
  );

  return `${TOKEN_VERSION}.${issuedAt}.${nonce}.${toBase64Url(signature)}`;
}

/**
 * Checks a token's signature and age. It does not spend it: call
 * `spendFormToken` once the submission is otherwise valid, so a visitor who
 * corrects a typo can resubmit with the same token.
 */
export async function verifyFormToken(
  env: SecurityEnv,
  purpose: string,
  token: string,
  {minAgeMs, maxAgeMs}: {minAgeMs: number; maxAgeMs: number},
): Promise<FormTokenCheck> {
  if (!token) return {ok: false, reason: 'missing'};
  if (!env.SESSION_SECRET || token.length > 200) {
    return {ok: false, reason: 'invalid'};
  }

  const [version, issuedAt, nonce, signature] = token.split('.');

  if (
    version !== TOKEN_VERSION ||
    !/^\d{13}$/.test(issuedAt ?? '') ||
    !nonce ||
    !signature
  ) {
    return {ok: false, reason: 'invalid'};
  }

  let signatureBytes: Uint8Array<ArrayBuffer>;

  try {
    signatureBytes = fromBase64Url(signature);
  } catch {
    return {ok: false, reason: 'invalid'};
  }

  // `subtle.verify` compares in constant time, so the signature can't be
  // recovered byte-by-byte from response timing.
  const key = await importHmacKey(env.SESSION_SECRET);
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(tokenPayload(purpose, issuedAt, nonce)),
  );

  if (!valid) return {ok: false, reason: 'invalid'};

  const age = Date.now() - Number(issuedAt);

  if (age < minAgeMs) return {ok: false, reason: 'too-fast'};
  if (age > maxAgeMs) return {ok: false, reason: 'expired'};

  return {ok: true, nonce};
}

/** Marks a verified token as used. Returns false if it was already spent. */
export async function spendFormToken(
  request: Request,
  purpose: string,
  nonce: string,
  maxAgeMs: number,
) {
  const spent = await consumeRateLimit(request, {
    bucket: `${purpose}:token`,
    identifier: nonce,
    limit: 1,
    windowSeconds: Math.ceil(maxAgeMs / 1000),
  });

  return spent.allowed;
}

/* =========================================================
   CAPTCHA — CLOUDFLARE TURNSTILE
   ========================================================= */

/** Form field the Turnstile widget writes its token into. */
export const CAPTCHA_FIELD = 'cf-turnstile-response';

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function isCaptchaEnabled(env: SecurityEnv) {
  return Boolean(env.TURNSTILE_SECRET_KEY && env.PUBLIC_TURNSTILE_SITE_KEY);
}

export type CaptchaCheck =
  | {ok: true}
  | {ok: false; reason: 'missing' | 'rejected' | 'unavailable'; detail?: string};

/**
 * Verifies a Turnstile token server-side. A token is single use and bound to
 * the action it was issued for, so one solved challenge cannot be replayed
 * against this form or reused on another.
 *
 * Fails closed: if Cloudflare cannot be reached the submission is refused.
 */
export async function verifyCaptcha(
  request: Request,
  env: SecurityEnv,
  token: string,
  expectedAction: string,
): Promise<CaptchaCheck> {
  if (!token) return {ok: false, reason: 'missing'};
  if (token.length > 2048) return {ok: false, reason: 'rejected'};

  const body = new FormData();
  body.set('secret', env.TURNSTILE_SECRET_KEY ?? '');
  body.set('response', token);

  const ip = getClientIp(request);
  if (ip) body.set('remoteip', ip);

  let outcome: {
    success?: boolean;
    action?: string;
    'error-codes'?: string[];
  };

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });

    outcome = (await response.json()) as typeof outcome;
  } catch (error) {
    return {
      ok: false,
      reason: 'unavailable',
      detail: error instanceof Error ? error.message : String(error),
    };
  }

  if (!outcome.success) {
    return {
      ok: false,
      reason: 'rejected',
      detail: outcome['error-codes']?.join(', '),
    };
  }

  if (outcome.action && outcome.action !== expectedAction) {
    return {
      ok: false,
      reason: 'rejected',
      detail: `action mismatch (${outcome.action})`,
    };
  }

  return {ok: true};
}
