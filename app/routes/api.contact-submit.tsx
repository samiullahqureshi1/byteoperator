import type {Route} from './+types/api.contact-submit';
import {
  toTagSlug,
  upsertCustomerLead,
  type LeadMetafield,
} from '~/lib/shopify-admin.server';

const RECIPIENT = '2009tabontech@gmail.com';

const METAFIELD_NAMESPACE = 'custom';

/**
 * Applied to every contact enquiry, alongside the per-answer tags built below.
 * `lead` is shared with the AI visibility audit form so both funnels can be
 * segmented together; `contact-form` follows the store's existing
 * `getting-started-form` convention for naming the originating form.
 */
const BASE_TAGS = ['contact-form', 'lead'] as const;

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
  // Which form the enquiry came from. Absent on the contact page itself.
  const enquirySource = readField(form, 'enquirySource');

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

  const hasConsent = Boolean(marketingConsent) && marketingConsent !== 'off';

  const newsletter = hasConsent ? 'Yes' : 'No';

  const submittedAt = new Date().toISOString();

  /*
   * Every answer is stored twice on purpose: the metafield keeps the exact
   * wording for a human to read, while the tag is a slug the team can segment
   * and filter customers by in the admin.
   */
  const answers: {key: string; tagPrefix: string; value: string}[] = [
    {key: 'contact_budget', tagPrefix: 'budget', value: budget},
    {key: 'contact_service', tagPrefix: 'service', value: service},
    {key: 'contact_source', tagPrefix: 'source', value: source},
    {key: 'contact_enquiry_source', tagPrefix: 'enquiry', value: enquirySource},
  ];

  const leadMetafields: LeadMetafield[] = [
    {
      namespace: METAFIELD_NAMESPACE,
      key: 'company_name',
      type: 'single_line_text_field',
      value: company,
    },
    {
      namespace: METAFIELD_NAMESPACE,
      key: 'contact_phone',
      type: 'single_line_text_field',
      value: phone,
    },
    {
      namespace: METAFIELD_NAMESPACE,
      key: 'messagerequirements',
      type: 'multi_line_text_field',
      value: message,
    },
    {
      namespace: METAFIELD_NAMESPACE,
      key: 'contact_submitted_at',
      type: 'date_time',
      value: submittedAt,
    },
    ...answers
      .filter((answer) => answer.value)
      .map((answer) => ({
        namespace: METAFIELD_NAMESPACE,
        key: answer.key,
        type: 'single_line_text_field',
        value: answer.value,
      })),
    ...(uploadedUrl
      ? [
          {
            namespace: METAFIELD_NAMESPACE,
            key: 'contact_file_url',
            type: 'url',
            value: uploadedUrl,
          },
        ]
      : []),
  ];

  const leadTags = [
    ...BASE_TAGS,
    // Matches the tag the store already uses for newsletter subscribers.
    ...(hasConsent ? ['newsletter'] : []),
    ...answers
      .map((answer) => toTagSlug(answer.tagPrefix, answer.value))
      .filter(Boolean),
  ];

  const leadNote = [
    enquirySource
      ? `Website enquiry - ${enquirySource}`
      : 'Website contact enquiry',
    `Company: ${company}`,
    `Phone: ${phone}`,
    `Budget: ${budget}`,
    service ? `Service: ${service}` : '',
    `Found us via: ${source}`,
    uploadedUrl ? `Uploaded file: ${uploadedUrl}` : '',
    `Submitted: ${submittedAt}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  /*
   * Deliberately started before — and independent of — the EmailJS send, so
   * the enquiry is recorded against the customer even when email delivery is
   * misconfigured or down. The two then run concurrently.
   *
   * The `.catch` keeps this from ever rejecting: several paths below return
   * early, and an unawaited rejection would take down the worker.
   */
  const leadPromise = upsertCustomerLead(context.env, {
    email,
    firstName,
    lastName,
    phone,
    note: leadNote,
    tags: leadTags,
    metafields: leadMetafields,
    subscribeToMarketing: hasConsent,
  }).catch((error: unknown) => ({
    ok: false as const,
    reason: error instanceof Error ? error.message : String(error),
  }));

  /**
   * Awaits the customer write and logs the outcome. Called on every exit path
   * so the request never resolves while the write is still in flight — a
   * worker can be torn down the moment the response is returned.
   */
  async function settleLead() {
    const lead = await leadPromise;

    if (!lead.ok) {
      console.error(
        `[contact-submit] FAIL — the customer record was not saved for "${email}". Reason: ${lead.reason}`,
      );

      return false;
    }

    if (lead.consentWarning) {
      console.error(
        `[contact-submit] PARTIAL — customer ${lead.customerId} saved for "${email}" but marketing consent was rejected. Reason: ${lead.consentWarning}`,
      );
    }

    console.log(
      `[contact-submit] SUCCESS — ${
        lead.created ? 'created' : 'updated'
      } customer ${lead.customerId} for "${email}" with tags [${leadTags.join(
        ', ',
      )}].`,
    );

    return true;
  }

  /**
   * Builds the response for a failed email send.
   *
   * The enquiry is stored against the Shopify customer independently of the
   * email, so when that write succeeded the submission genuinely has been
   * received and the visitor is told so — showing an error there would be
   * untrue and would push them into sending a duplicate. Only a submission
   * that reached neither the inbox nor the customer record is a real failure.
   */
  async function emailFailureResponse(visitorError: string, status: number) {
    const leadSaved = await settleLead();

    if (leadSaved) {
      console.error(
        `[contact-submit] DEGRADED — no email was sent for "${email}", but the enquiry is saved on the customer record. Check Shopify for leads tagged "contact-form".`,
      );

      return jsonResponse({ok: true});
    }

    return jsonResponse({ok: false, error: visitorError}, status);
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

    return emailFailureResponse(
      `Enquiries are not available right now. Please email ${RECIPIENT} instead.`,
      500,
    );
  }


  // The template's `message` variable is the only place left to surface an
  // uploaded file link, or which form the enquiry came from — the fixed
  // template_params list below has no variable for either, so this is how
  // they reach the inbox without inventing variables the template doesn't
  // expect.
  const messageWithAttachment = [
    enquirySource ? `Enquiry from: ${enquirySource}` : '',
    message,
    uploadedUrl ? `Uploaded file: ${uploadedUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const templateParams = {
    to_email: RECIPIENT,
    reply_to: sanitizeHeaderValue(email),
    first_name: escapeHtml(firstName),
    last_name: escapeHtml(lastName),
    company: escapeHtml(company),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    budget: escapeHtml(budget),
    service: escapeHtml(service || 'Not selected'),
    referral: escapeHtml(source),
    message: escapeHtml(messageWithAttachment),
    newsletter,
    time: new Date().toISOString(),
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

    return emailFailureResponse(
      `We could not send your enquiry. Please try again or email ${RECIPIENT}.`,
      502,
    );
  }

  if (!response.ok) {
    console.error(
      `[contact-submit] FAIL — EmailJS rejected the send. HTTP ${response.status} ${response.statusText}. Reason: ${
        responseText || '(empty response body)'
      }`,
    );

    return emailFailureResponse(
      'We could not send your enquiry. Please try again.',
      502,
    );
  }

  console.log(
    `[contact-submit] SUCCESS — EmailJS accepted the enquiry from "${email}" for ${RECIPIENT}. HTTP ${response.status}: ${responseText}`,
  );

  await settleLead();

  return jsonResponse({ok: true});
}
