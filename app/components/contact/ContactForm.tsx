'use client';

import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
] as const;

const SERVICE_OPTIONS = [
  'Software Development',
  'Enterprise Platform Solutions',
  'SEO',
  'CRO',
  'Email & SMS',
  'AI / GEO',
  'Support & Maintenance',
  'Other',
] as const;

const SOURCE_OPTIONS = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Saw Our Work',
  'Social Media',
  'ChatGPT / AI Search',
  'Software',
  'Other',
] as const;

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

const ALLOWED_UPLOAD_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'pdf',
  'doc',
  'docx',
];

const UPLOAD_ACCEPT = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
].join(',');

const UPLOAD_TYPE_ERROR =
  'That file type is not supported. Please upload a JPG, PNG, WEBP, PDF, DOC or DOCX file.';

const UPLOAD_SIZE_ERROR =
  'That file is larger than 10MB. Please upload a smaller file.';

function getUploadExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot < 0) {
    return '';
  }

  return fileName.slice(lastDot + 1).toLowerCase();
}

interface ContactFormProps {
  /**
   * Which funnel the enquiry came from, sent as a hidden field. Lets a quote
   * asked for on the bulk hours page be told apart from a plain contact page
   * enquiry once it lands in the inbox and on the Software customer.
   */
  enquirySource?: string;
  /** Pre-filled project details, e.g. the package the visitor was looking at. */
  defaultMessage?: string;
  /** Pre-selected service, when the page already implies one. */
  defaultService?: string;
}

export function ContactForm({
  enquirySource,
  defaultMessage,
  defaultService,
}: ContactFormProps) {
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBusy = isUploading || isSubmitting;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.currentTarget.files?.[0] ?? null;

    if (!selected) {
      setFile(null);
      setFileError('');
      return;
    }

    if (
      !ALLOWED_UPLOAD_EXTENSIONS.includes(getUploadExtension(selected.name))
    ) {
      setFile(null);
      setFileError(UPLOAD_TYPE_ERROR);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return;
    }

    if (selected.size > MAX_UPLOAD_SIZE) {
      setFile(null);
      setFileError(UPLOAD_SIZE_ERROR);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return;
    }

    setFile(selected);
    setFileError('');
  }

  function removeFile() {
    setFile(null);
    setFileError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    fileInputRef.current?.focus();
  }

  async function uploadFile(selected: File) {
    const payload = new FormData();
    payload.append('file', selected);

    const response = await fetch('/api/contact-upload', {
      method: 'POST',
      body: payload,
    });

    let result: {url?: string; error?: string} = {};

    try {
      result = (await response.json()) as {url?: string; error?: string};
    } catch {
      result = {};
    }

    if (!response.ok || !result.url) {
      throw new Error(
        result.error ||
          'The upload failed. Please try again or email your file to info@byteoperator.com.',
      );
    }

    return result.url;
  }

  async function submitEnquiry(data: FormData) {
    const response = await fetch('/api/contact-submit', {
      method: 'POST',
      body: data,
    });

    let result: {ok?: boolean; error?: string} = {};

    try {
      result = (await response.json()) as {ok?: boolean; error?: string};
    } catch {
      result = {};
    }

    if (!response.ok || !result.ok) {
      throw new Error(
        result.error ||
          'We could not send your enquiry. Please try again or email info@byteoperator.com.',
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isUploading || isSubmitting) {
      return;
    }

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    setSubmitError('');

    let uploadedUrl = '';

    if (file) {
      setFileError('');
      setIsUploading(true);
      setStatus('Uploading your file…');

      try {
        uploadedUrl = await uploadFile(file);
      } catch (error) {
        setIsUploading(false);
        setStatus('');
        setFileError(
          error instanceof Error
            ? error.message
            : 'The upload failed. Please try again.',
        );

        // Upload failed — do not send an enquiry with a missing file.
        return;
      }

      setIsUploading(false);
    }

    if (uploadedUrl) {
      data.set('uploadedUrl', uploadedUrl);
    }

    setIsSubmitting(true);
    setStatus('Sending your enquiry…');

    try {
      await submitEnquiry(data);
    } catch (error) {
      setIsSubmitting(false);
      setStatus('');
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not send your enquiry. Please try again.',
      );

      // Submission failed — keep the form intact so it can be retried.
      return;
    }

    setIsSubmitting(false);
    setStatus('');
    setSubmitError('');
    setIsSubmitted(true);

    form.reset();
    setFile(null);
    setFileError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <>
      {isSubmitted ? (
        <div
          className="ft-contact-form__thanks"
          role="status"
          aria-live="polite"
        >
          <h2 className="ft-contact-form__thanks-title">
            Thank you for getting in touch
          </h2>

          <p className="ft-contact-form__thanks-text">
            We&apos;ve received your enquiry and a member of the Byte Operator
            team will reply within 24 hours.
          </p>

          <button
            type="button"
            className="ft-contact-form__thanks-reset"
            onClick={() => setIsSubmitted(false)}
          >
            Send another enquiry
          </button>
        </div>
      ) : null}

      <form
        hidden={isSubmitted}
        className="ft-contact-form"
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        {enquirySource ? (
          <input
            type="hidden"
            name="enquirySource"
            value={enquirySource}
          />
        ) : null}

        <div className="ft-contact-form__row ft-contact-form__row--split">
          <ContactInput
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            required
          />

          <ContactInput
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            required
          />
        </div>

        <div className="ft-contact-form__row ft-contact-form__row--split">
          <ContactInput
            label="Company Name"
            name="company"
            autoComplete="organization"
            required
          />

          <ContactInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="ft-contact-form__row ft-contact-form__row--split">
          <ContactInput
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />

          <ContactSelect
            label="Budget"
            name="budget"
            placeholder="Select a budget band"
            options={BUDGET_OPTIONS}
            required
          />
        </div>

        <div className="ft-contact-form__row ft-contact-form__row--split">
          <ContactSelect
            label="Service Of Interest"
            name="service"
            placeholder="Please Select"
            options={SERVICE_OPTIONS}
            defaultValue={defaultService}
          />

          <ContactSelect
            label="How did you find us?"
            name="source"
            placeholder="Select an option"
            options={SOURCE_OPTIONS}
            required
          />
        </div>

        <div className="ft-contact-form__row">
          <label
            className="ft-contact-form__label"
            htmlFor="ft-contact-message"
          >
            Tell us about your project
            <span className="ft-contact-form__required">*</span>
          </label>

          <textarea
            id="ft-contact-message"
            name="message"
            className="ft-contact-form__textarea"
            rows={4}
            placeholder="Goals, timelines, what you're stuck on..."
            defaultValue={defaultMessage}
            required
          />
        </div>

        <div className="ft-contact-form__row ft-contact-form__row--file">
          <label
            className="ft-contact-form__label"
            htmlFor="ft-contact-file"
          >
            Attach files (optional)
          </label>

          <p
            className="ft-contact-form__hint"
            id="ft-contact-file-hint"
          >
            If you have a brief or relevant files you&apos;d like to attach,
            please add them here.
          </p>

          <input
            ref={fileInputRef}
            id="ft-contact-file"
            className="ft-contact-form__file-input"
            type="file"
            accept={UPLOAD_ACCEPT}
            aria-describedby="ft-contact-file-hint"
            onChange={handleFileChange}
          />

          <div className="ft-contact-form__file-row">
            <label
              className="ft-contact-form__file-trigger"
              htmlFor="ft-contact-file"
            >
              Choose Files
            </label>

            <span
              className="ft-contact-form__file-name"
              aria-live="polite"
            >
              {file ? file.name : 'No file chosen'}
            </span>

            {file ? (
              <button
                type="button"
                className="ft-contact-form__file-remove"
                onClick={removeFile}
                disabled={isBusy}
              >
                Remove
              </button>
            ) : null}
          </div>

          {fileError ? (
            <p
              className="ft-contact-form__file-error"
              role="alert"
            >
              {fileError}
            </p>
          ) : null}
        </div>

        <div
          className="ft-contact-form__honeypot"
          aria-hidden="true"
        >
          <label htmlFor="ft-contact-website">Website URL</label>

          <input
            id="ft-contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className="ft-contact-form__optin">
          <input
            type="checkbox"
            name="marketingConsent"
            defaultChecked
          />

          <span>
            Join our ecommerce newsletter for Software, SEO and growth
            insights.
          </span>
        </label>

        <p className="ft-contact-form__consent">
          By submitting this form, you agree that Byte Operator may use your
          details to respond to your enquiry.{' '}
          <a href="/policies/privacy-policy">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          className="ft-contact-form__submit"
          disabled={isBusy}
        >
          {isUploading
            ? 'Uploading file…'
            : isSubmitting
              ? 'Sending…'
              : 'Submit Enquiry'}

          <ArrowIcon />
        </button>

        {status ? (
          <p
            className="ft-contact-form__status"
            aria-live="polite"
          >
            {status}
          </p>
        ) : null}

        {submitError ? (
          <p
            className="ft-contact-form__error"
            role="alert"
          >
            {submitError}
          </p>
        ) : null}
      </form>
    </>
  );
}

interface ContactInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  required?: boolean;
}

function ContactInput({
  label,
  name,
  type = 'text',
  autoComplete,
  required = false,
}: ContactInputProps) {
  const id = `ft-contact-${name}`;

  return (
    <div>
      <label
        className="ft-contact-form__label"
        htmlFor={id}
      >
        {label}

        {required ? (
          <span className="ft-contact-form__required">*</span>
        ) : null}
      </label>

      <input
        id={id}
        className="ft-contact-form__input"
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

interface ContactSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  defaultValue?: string;
}

function ContactSelect({
  label,
  name,
  placeholder,
  options,
  required = false,
  defaultValue,
}: ContactSelectProps) {
  const id = `ft-contact-${name}`;

  return (
    <div>
      <label
        className="ft-contact-form__label"
        htmlFor={id}
      >
        {label}

        {required ? (
          <span className="ft-contact-form__required">*</span>
        ) : null}
      </label>

      <select
        id={id}
        className="ft-contact-form__select"
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7H13M13 7L8 2.5M13 7L8 11.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
