import type {Route} from './+types/api.contact-submit';

const RECIPIENT = 'info@thefoldtech.com';

const FROM_ADDRESS = 'FoldTech Website <onboarding@resend.dev>';

const SUBJECT = 'New FoldTech Website Enquiry';

const CLOUDINARY_URL_PREFIX = 'https://res.cloudinary.com/';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

interface ResendErrorResponse {
  message?: string;
  name?: string;
}

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

  const apiKey = context.env.RESEND_API_KEY;

  if (!apiKey) {
    return jsonResponse(
      {
        error: `Enquiries are not available right now. Please email ${RECIPIENT} instead.`,
      },
      500,
    );
  }

  const marketing =
    marketingConsent && marketingConsent !== 'off' ? 'Yes' : 'No';

  const lines = [
    'New enquiry from the FoldTech website',
    '',
    `Name: ${firstName} ${lastName}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Budget: ${budget}`,
    `Service: ${service || 'Not selected'}`,
    `How they found us: ${source}`,
    `Marketing consent: ${marketing}`,
    '',
    'Project details:',
    message,
  ];

  if (uploadedUrl) {
    lines.push('', 'Uploaded file:', uploadedUrl);
  }

  let response: Response;

  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [RECIPIENT],
        reply_to: sanitizeHeaderValue(email),
        subject: SUBJECT,
        text: lines.join('\n'),
      }),
    });
  } catch {
    return jsonResponse(
      {
        error: `We could not send your enquiry. Please try again or email ${RECIPIENT}.`,
      },
      502,
    );
  }

  if (!response.ok) {
    let result: ResendErrorResponse = {};

    try {
      result = (await response.json()) as ResendErrorResponse;
    } catch {
      result = {};
    }

    return jsonResponse(
      {
        error:
          result.message ||
          `We could not send your enquiry. Please try again or email ${RECIPIENT}.`,
      },
      502,
    );
  }

  return jsonResponse({ok: true});
}
