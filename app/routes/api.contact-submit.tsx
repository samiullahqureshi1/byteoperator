import type {Route} from './+types/api.contact-submit';

const RECIPIENT = '2009tabontech@gmail.com';

const CLOUDINARY_URL_PREFIX = 'https://res.cloudinary.com/';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const REQUIRED_FIELDS = [
  {name: 'firstName', label: 'First name'},
  {name: 'lastName', label: 'Last name'},
  {name: 'company', label: 'Company name'},
  {name: 'email', label: 'Email'},
  {name: 'phone', label: 'Phone'},
  {name: 'budget', label: 'Budget'},
  {name: 'source', label: 'How did you find us'},
  {name: 'message', label: 'Project details'},
] as const;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function readField(form: FormData, name: string) {
  const value = form.get(name);

  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Strip CR/LF so a submitted value can never inject extra headers into the
 * outgoing email (subject and reply-to are header-bound).
 */
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * EmailJS inserts template_params into the template HTML with a raw string
 * substitution (no escaping), so untrusted form values must be escaped here
 * or a submission could inject markup into the outgoing email.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function loader() {
  return jsonResponse({error: 'Method not allowed.'}, 405);
}

export async function action({context, request}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return jsonResponse({error: 'Method not allowed.'}, 405);
  }

  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return jsonResponse(
      {error: 'We could not read that submission. Please try again.'},
      400,
    );
  }

  // Honeypot: bots fill this hidden field. Report success so they learn nothing.
  if (readField(form, 'website')) {
    return jsonResponse({ok: true});
  }

  const firstName = readField(form, 'firstName');
  const lastName = readField(form, 'lastName');
  const company = readField(form, 'company');
  const email = readField(form, 'email');
  const phone = readField(form, 'phone');
  const budget = readField(form, 'budget');
  const service = readField(form, 'service');
  const source = readField(form, 'source');
  const message = readField(form, 'message');
  const marketingConsent = readField(form, 'marketingConsent');
  const uploadedUrl = readField(form, 'uploadedUrl');

  const values: Record<string, string> = {
    firstName,
    lastName,
    company,
    email,
    phone,
    budget,
    source,
    message,
  };

  const missing = REQUIRED_FIELDS.filter(
    (field) => !values[field.name],
  ).map((field) => field.label);

  if (missing.length) {
    return jsonResponse(
      {error: `Please complete these fields: ${missing.join(', ')}.`},
      400,
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({error: 'Please enter a valid email address.'}, 400);
  }

  if (uploadedUrl && !uploadedUrl.startsWith(CLOUDINARY_URL_PREFIX)) {
    return jsonResponse({error: 'That file link is not valid.'}, 400);
  }

  const serviceId = context.env.SERVICE_ID;
  const templateId = context.env.TEMPLETE_ID;
  const publicKey = context.env.PUBLIC_MAILJS_API_KEY;
  const privateKey = context.env.PRIVATE_MAILJS_API_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error(
      '[contact-submit] FAIL — EmailJS is not configured. Missing env var(s):',
      {
        SERVICE_ID: Boolean(serviceId),
        TEMPLETE_ID: Boolean(templateId),
        PUBLIC_MAILJS_API_KEY: Boolean(publicKey),
        PRIVATE_MAILJS_API_KEY: Boolean(privateKey),
      },
    );

    return jsonResponse(
      {
        ok: false,
        error: `Enquiries are not available right now. Please email ${RECIPIENT} instead.`,
      },
      500,
    );
  }

  const marketing =
    marketingConsent && marketingConsent !== 'off' ? 'Yes' : 'No';

  const attachmentRow = uploadedUrl
    ? `<tr><td style="padding:8px 0;color:#64748b;">Uploaded file</td><td style="padding:8px 0;"><a href="${escapeHtml(uploadedUrl)}" style="color:#0f766e;text-decoration:none;word-break:break-all;">${escapeHtml(uploadedUrl)}</a></td></tr>`
    : '';

  const templateParams = {
    to_email: RECIPIENT,
    reply_to: sanitizeHeaderValue(email),
    first_name: escapeHtml(firstName),
    last_name: escapeHtml(lastName),
    full_name: escapeHtml(`${firstName} ${lastName}`),
    company: escapeHtml(company),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    budget: escapeHtml(budget),
    service: escapeHtml(service || 'Not selected'),
    source: escapeHtml(source),
    marketing_consent: marketing,
    message: escapeHtml(message),
    uploaded_url: uploadedUrl ? escapeHtml(uploadedUrl) : 'No file attached',
    attachment_row: attachmentRow,
  };

  let response: Response;
  let responseText = '';

  try {
    response = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });

    responseText = await response.text();
  } catch (error) {
    console.error(
      `[contact-submit] FAIL — could not reach EmailJS. Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );

    return jsonResponse(
      {
        ok: false,
        error: `We could not send your enquiry. Please try again or email ${RECIPIENT}.`,
      },
      502,
    );
  }

  if (!response.ok) {
    console.error(
      `[contact-submit] FAIL — EmailJS rejected the send. HTTP ${response.status} ${response.statusText}. Reason: ${
        responseText || '(empty response body)'
      }`,
    );

    return jsonResponse(
      {
        ok: false,
        error: 'We could not send your enquiry. Please try again.',
      },
      502,
    );
  }

  console.log(
    `[contact-submit] SUCCESS — EmailJS accepted the enquiry from "${email}" for ${RECIPIENT}. HTTP ${response.status}: ${responseText}`,
  );

  return jsonResponse({ok: true});
}
