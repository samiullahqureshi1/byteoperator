import type {Route} from './+types/api.audit-signup';
import {
  AdminApiError,
  upsertCustomerLead,
} from '~/lib/shopify-admin.server';
import {
  CAPTCHA_FIELD,
  consumeRateLimit,
  createFormToken,
  FormBodyError,
  getClientIp,
  isCaptchaEnabled,
  isSameOriginRequest,
  maskEmail,
  readCleanField,
  readFormDataWithLimit,
  secureJsonResponse,
  spendFormToken,
  verifyCaptcha,
  verifyFormToken,
} from '~/lib/form-security.server';

/**
 * Free AI Visibility Audit signup.
 *
 * Writes the lead straight into the Shopify customer database through the
 * Admin API so the sales team works from one list: a new customer is created,
 * and an email that already exists is enriched rather than rejected. Every
 * lead is tagged so audit requests can be segmented in the admin.
 *
 * GET issues the signed form token (and the CAPTCHA site key, when enabled).
 * POST runs the abuse checks in `form-security.server.ts` cheapest-first, so
 * junk is turned away before it costs an Admin API call.
 */

/** Binds tokens and CAPTCHA solutions to this form so neither works elsewhere. */
const FORM_PURPOSE = 'audit-signup';

/** Four short fields plus a CAPTCHA token fit comfortably; anything larger is not a person. */
const MAX_BODY_BYTES = 16 * 1024;

/** No one types four required fields this fast; autofill still takes longer. */
const TOKEN_MIN_AGE_MS = 2_500;

/** Long enough for a visitor who leaves the tab open, short enough to limit reuse. */
const TOKEN_MAX_AGE_MS = 2 * 60 * 60 * 1000;

/** Counts every post, including ones with typos, so it leaves room for corrections. */
const IP_RATE_LIMIT = {limit: 8, windowSeconds: 10 * 60};
const EMAIL_RATE_LIMIT = {limit: 3, windowSeconds: 24 * 60 * 60};

/** RFC 5321 caps an address at 254 characters and its local part at 64. */
const EMAIL_MAX_LENGTH = 254;
const EMAIL_LOCAL_MAX_LENGTH = 64;

const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/;

const NAME_MAX_LENGTH = 100;
const COMPANY_MAX_LENGTH = 200;
const WEBSITE_MAX_LENGTH = 500;

/** Letters (any script), combining marks, spaces, apostrophes, hyphens, dots. */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’. -]*$/u;

/**
 * Markup and links have no business in a company name; they are the payload
 * of nearly every form-spam submission and an injection risk wherever the
 * value is later rendered (emails, Flow, CRM exports).
 */
const COMPANY_FORBIDDEN = /[<>{}\\]|:\/\/|\bwww\./i;

/**
 * Hostnames that are never a public store. Rejecting them also means the
 * audit team — or any tool that later fetches the URL — can't be pointed at
 * internal infrastructure (SSRF).
 */
const RESERVED_HOST_SUFFIXES = [
  'localhost',
  '.local',
  '.internal',
  '.intranet',
  '.lan',
  '.home',
  '.corp',
  '.test',
  '.example',
  '.invalid',
  '.onion',
];

/** Tags applied to every audit lead, so they can be segmented in the admin. */
const LEAD_TAGS = ['ai-visibility-audit', 'lead'] as const;

const METAFIELD_NAMESPACE = 'custom';

/*
 * The store already captures a customer's site in `custom.website_url` (it is
 * pinned first on the customer page and populated by the existing lead forms),
 * so new audit leads write the same field rather than a parallel one.
 *
 * For an existing customer that field is left alone — anyone can submit this
 * form with any email — and the requested site lands in `audit_website`.
 */
const WEBSITE_METAFIELD_KEY = 'website_url';

/** Audit-specific, so these are their own fields. */
const AUDIT_WEBSITE_METAFIELD_KEY = 'audit_website';
const AUDIT_COMPANY_METAFIELD_KEY = 'audit_company';
const PLATFORM_METAFIELD_KEY = 'audit_platform';
const REQUESTED_AT_METAFIELD_KEY = 'audit_requested_at';

const GENERIC_ERROR =
  'We could not submit your request right now. Please try again or email info@thefoldtech.com.';

const EXPIRED_ERROR =
  'This form has expired. Please submit it again.';

/** Kept in sync with the select rendered by <AiVisibilityAuditHero />. */
export const AUDIT_PLATFORM_OPTIONS = [
  'Shopify',
  'Shopify Plus',
  'WooCommerce',
  'BigCommerce',
  'Magento / Adobe Commerce',
  'Salesforce Commerce Cloud',
  'Custom / Headless',
  'Other',
] as const;

/**
 * Deliberately indistinguishable from a real success. Bots that trip a silent
 * check (honeypot, fill-time) learn nothing they could tune against.
 */
function silentlyDiscard(reason: string, request: Request) {
  console.warn(
    `[audit-signup] BLOCKED — ${reason} (ip: ${getClientIp(request) ?? 'unknown'}).`,
  );

  return secureJsonResponse({ok: true});
}

function tooManyRequests(retryAfterSeconds: number) {
  return secureJsonResponse(
    {
      ok: false,
      error:
        'Too many requests. Please wait a few minutes and try again, or email info@thefoldtech.com.',
    },
    429,
    {'retry-after': String(retryAfterSeconds)},
  );
}

function isValidEmail(email: string) {
  const local = email.slice(0, email.lastIndexOf('@'));

  return (
    email.length <= EMAIL_MAX_LENGTH &&
    local.length <= EMAIL_LOCAL_MAX_LENGTH &&
    !email.includes('..') &&
    !local.startsWith('.') &&
    !local.endsWith('.') &&
    EMAIL_PATTERN.test(email)
  );
}

/**
 * Accepts what people actually type ("foldtech.com", "www.foldtech.com/shop")
 * and returns a canonical public `https://host/path` URL, or `null`.
 *
 * Query strings and fragments are dropped: a store's address never needs them
 * and they are where tracking junk and injection payloads ride along.
 */
function normalizeWebsite(value: string) {
  if (/\s/.test(value)) return null;

  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(value);

  if (hasScheme && !/^https?:\/\//i.test(value)) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(hasScheme ? value : `https://${value}`);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  const labels = hostname.split('.');
  const tld = labels[labels.length - 1] ?? '';

  if (
    // Credentials in a URL are a phishing trick, not a store address.
    url.username ||
    url.password ||
    // Public storefronts are served on the default port.
    url.port ||
    labels.length < 2 ||
    labels.some((label) => !label || label.length > 63) ||
    // Requires a real alphabetic (or IDN) TLD, which also rules out IP addresses.
    !/^(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(tld) ||
    RESERVED_HOST_SUFFIXES.some(
      (suffix) => hostname === suffix.replace(/^\./, '') || hostname.endsWith(suffix),
    )
  ) {
    return null;
  }

  return `https://${hostname}${url.pathname === '/' ? '' : url.pathname}`;
}

export async function loader({context, request}: Route.LoaderArgs) {
  if (!isSameOriginRequest(request)) {
    return secureJsonResponse({error: 'Forbidden.'}, 403);
  }

  return secureJsonResponse({
    token: await createFormToken(context.env, FORM_PURPOSE),
    captchaSiteKey: isCaptchaEnabled(context.env)
      ? context.env.PUBLIC_TURNSTILE_SITE_KEY
      : null,
  });
}

export async function action({context, request}: Route.ActionArgs) {
  const {env} = context;

  if (request.method !== 'POST') {
    return secureJsonResponse({error: 'Method not allowed.'}, 405, {
      allow: 'GET, POST',
    });
  }

  // 1. Only this site's own pages may post here.
  if (!isSameOriginRequest(request)) {
    console.warn(
      `[audit-signup] BLOCKED — cross-origin post (origin: ${
        request.headers.get('origin') ?? 'none'
      }, sec-fetch-site: ${request.headers.get('sec-fetch-site') ?? 'none'}).`,
    );

    return secureJsonResponse({ok: false, error: 'Forbidden.'}, 403);
  }

  // 2. Throttle by IP before reading the body, so floods stay cheap.
  const ip = getClientIp(request);

  if (ip) {
    const ipLimit = await consumeRateLimit(request, {
      bucket: `${FORM_PURPOSE}:ip`,
      identifier: ip,
      ...IP_RATE_LIMIT,
    });

    if (!ipLimit.allowed) {
      console.warn(`[audit-signup] RATE LIMITED — ip ${ip}.`);

      return tooManyRequests(ipLimit.retryAfterSeconds);
    }
  }

  // 3. A small, well-formed form body only.
  let form: FormData;

  try {
    form = await readFormDataWithLimit(request, MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof FormBodyError) {
      return secureJsonResponse(
        {ok: false, error: 'We could not read that submission. Please try again.'},
        error.status,
      );
    }

    throw error;
  }

  // 4. Honeypot: bots fill this hidden field.
  if (readCleanField(form, 'companyFax')) {
    return silentlyDiscard('honeypot filled', request);
  }

  // 5. Signed token: the page was loaded and the fill time is human.
  const tokenCheck = await verifyFormToken(
    env,
    FORM_PURPOSE,
    readCleanField(form, 'formToken'),
    {minAgeMs: TOKEN_MIN_AGE_MS, maxAgeMs: TOKEN_MAX_AGE_MS},
  );

  if (!tokenCheck.ok) {
    if (tokenCheck.reason === 'too-fast') {
      return silentlyDiscard('submitted too fast to be human', request);
    }

    console.warn(`[audit-signup] BLOCKED — form token ${tokenCheck.reason}.`);

    return secureJsonResponse(
      {ok: false, code: 'form_expired', error: EXPIRED_ERROR},
      400,
    );
  }

  // 6. Field validation. Runs before the single-use checks below, so a
  //    visitor fixing a typo doesn't burn their token or CAPTCHA solve.
  const firstName = readCleanField(form, 'firstName');
  const lastName = readCleanField(form, 'lastName');
  const email = readCleanField(form, 'email').toLowerCase();
  const website = readCleanField(form, 'website');
  const company = readCleanField(form, 'company');
  const platform = readCleanField(form, 'platform');
  const marketingConsent = readCleanField(form, 'marketingConsent');

  const missing = [
    [firstName, 'First name'],
    [lastName, 'Last name'],
    [email, 'Email'],
    [website, 'Website'],
  ]
    .filter(([value]) => !value)
    .map(([, label]) => label);

  if (missing.length) {
    return secureJsonResponse(
      {ok: false, error: `Please complete these fields: ${missing.join(', ')}.`},
      400,
    );
  }

  if (
    firstName.length > NAME_MAX_LENGTH ||
    lastName.length > NAME_MAX_LENGTH ||
    company.length > COMPANY_MAX_LENGTH ||
    website.length > WEBSITE_MAX_LENGTH
  ) {
    return secureJsonResponse(
      {ok: false, error: 'One of those fields is too long.'},
      400,
    );
  }

  if (!NAME_PATTERN.test(firstName) || !NAME_PATTERN.test(lastName)) {
    return secureJsonResponse(
      {ok: false, error: 'Please enter your name using letters only.'},
      400,
    );
  }

  if (company && COMPANY_FORBIDDEN.test(company)) {
    return secureJsonResponse(
      {ok: false, error: 'Please enter your company name without links or symbols.'},
      400,
    );
  }

  if (!isValidEmail(email)) {
    return secureJsonResponse(
      {ok: false, error: 'Please enter a valid email address.'},
      400,
    );
  }

  const websiteUrl = normalizeWebsite(website);

  if (!websiteUrl) {
    return secureJsonResponse(
      {ok: false, error: 'Please enter a valid public website address, e.g. yourstore.com.'},
      400,
    );
  }

  // Only accept a platform the form actually offers; anything else is dropped.
  const resolvedPlatform = (
    AUDIT_PLATFORM_OPTIONS as readonly string[]
  ).includes(platform)
    ? platform
    : '';

  // 7. CAPTCHA, whenever it is configured.
  if (isCaptchaEnabled(env)) {
    const captcha = await verifyCaptcha(
      request,
      env,
      readCleanField(form, CAPTCHA_FIELD),
      FORM_PURPOSE,
    );

    if (!captcha.ok) {
      console.warn(
        `[audit-signup] BLOCKED — CAPTCHA ${captcha.reason}${
          captcha.detail ? ` (${captcha.detail})` : ''
        }.`,
      );

      return secureJsonResponse(
        {
          ok: false,
          code: 'captcha_failed',
          error:
            captcha.reason === 'unavailable'
              ? GENERIC_ERROR
              : 'Please complete the security check and try again.',
        },
        captcha.reason === 'unavailable' ? 503 : 400,
      );
    }
  }

  // 8. One submission per token.
  if (
    !(await spendFormToken(
      request,
      FORM_PURPOSE,
      tokenCheck.nonce,
      TOKEN_MAX_AGE_MS,
    ))
  ) {
    return silentlyDiscard('form token replayed', request);
  }

  // 9. Stop one address being hammered, whoever is sending it.
  const emailLimit = await consumeRateLimit(request, {
    bucket: `${FORM_PURPOSE}:email`,
    identifier: email,
    ...EMAIL_RATE_LIMIT,
  });

  if (!emailLimit.allowed) {
    // Their earlier request is already on file, so success is the truthful answer.
    return silentlyDiscard(
      `repeat submissions for ${maskEmail(email)}`,
      request,
    );
  }

  const requestedAt = new Date().toISOString();

  const metafields = [
    {
      namespace: METAFIELD_NAMESPACE,
      key: WEBSITE_METAFIELD_KEY,
      type: 'single_line_text_field',
      value: websiteUrl,
      onlyIfNew: true,
    },
    {
      namespace: METAFIELD_NAMESPACE,
      key: AUDIT_WEBSITE_METAFIELD_KEY,
      type: 'single_line_text_field',
      value: websiteUrl,
    },
    {
      namespace: METAFIELD_NAMESPACE,
      key: REQUESTED_AT_METAFIELD_KEY,
      type: 'date_time',
      value: requestedAt,
    },
    ...(company
      ? [
          {
            namespace: METAFIELD_NAMESPACE,
            key: AUDIT_COMPANY_METAFIELD_KEY,
            type: 'single_line_text_field',
            value: company,
          },
        ]
      : []),
    ...(resolvedPlatform
      ? [
          {
            namespace: METAFIELD_NAMESPACE,
            key: PLATFORM_METAFIELD_KEY,
            type: 'single_line_text_field',
            value: resolvedPlatform,
          },
        ]
      : []),
  ];

  /*
   * The note is the one place these details show on the customer page in the
   * Shopify admin without a metafield definition, so the website is repeated
   * here on purpose. It is only written for new customers.
   */
  const note = [
    'Free AI Visibility Audit request',
    `Website: ${websiteUrl}`,
    company ? `Company: ${company}` : '',
    resolvedPlatform ? `Platform: ${resolvedPlatform}` : '',
    `Requested: ${requestedAt}`,
  ]
    .filter(Boolean)
    .join('\n');

  // Consent must be an affirmative tick, never inferred from any other value.
  const hasConsent = marketingConsent === 'yes';

  const maskedEmail = maskEmail(email);

  try {
    const result = await upsertCustomerLead(env, {
      email,
      firstName,
      lastName,
      note,
      tags: [...LEAD_TAGS],
      metafields,
      subscribeToMarketing: hasConsent,
      preserveExistingProfile: true,
    });

    if (!result.ok) {
      console.error(
        `[audit-signup] FAIL — could not save "${maskedEmail}". Reason: ${result.reason}`,
      );

      return secureJsonResponse({ok: false, error: GENERIC_ERROR}, 502);
    }

    if (result.consentWarning) {
      console.error(
        `[audit-signup] PARTIAL — lead saved for "${maskedEmail}" but marketing consent was not applied. Reason: ${result.consentWarning}`,
      );
    }

    console.log(
      `[audit-signup] SUCCESS — ${
        result.created ? 'created' : 'enriched'
      } customer ${result.customerId} for "${maskedEmail}" (${websiteUrl}).`,
    );

    return secureJsonResponse({ok: true});
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);

    console.error(
      `[audit-signup] FAIL — Admin API request failed for "${maskedEmail}". Reason: ${reason}`,
    );

    return secureJsonResponse(
      {
        ok: false,
        error:
          error instanceof AdminApiError && /not configured/.test(reason)
            ? 'Audit requests are not available right now. Please email info@thefoldtech.com instead.'
            : GENERIC_ERROR,
      },
      502,
    );
  }
}
