import {useCallback, useEffect, useRef, useState, type FormEvent} from 'react';
import {useNonce} from '@shopify/hydrogen';

/**
 * Free AI Visibility Audit signup.
 *
 * Posts to /api/audit-signup, which writes the lead into the Shopify customer
 * database through the Admin API. Rendered for the `ai-visibility-audit`
 * Shopify page in <PageContent>.
 *
 * On mount the form fetches a signed, single-use token from the same endpoint
 * (see `form-security.server.ts`) and, when the server has CAPTCHA enabled,
 * the Turnstile site key. Both travel back with the submission.
 */

const ENDPOINT = '/api/audit-signup';

/** Must match FORM_PURPOSE in /api/audit-signup — Turnstile binds solves to it. */
const CAPTCHA_ACTION = 'audit-signup';

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>,
  ) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<TurnstileApi> | null = null;

/** Loads Cloudflare Turnstile once per page, however many times the form mounts. */
function loadTurnstile(nonce: string | undefined) {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  turnstileScript ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    if (nonce) script.nonce = nonce;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error('Turnstile did not initialise.'));
    script.onerror = () => {
      turnstileScript = null;
      reject(new Error('Turnstile failed to load.'));
    };
    document.head.appendChild(script);
  });

  return turnstileScript;
}

/** Kept in sync with AUDIT_PLATFORM_OPTIONS in /api/audit-signup. */
const PLATFORM_OPTIONS = [
  'Shopify',
  'Shopify Plus',
  'WooCommerce',
  'BigCommerce',
  'Magento / Adobe Commerce',
  'Salesforce Commerce Cloud',
  'Custom / Headless',
  'Other',
] as const;

const AUDIT_CHECKS = [
  {
    number: '01',
    title: 'AI Search Visibility',
    description:
      'How your brand and products currently surface across ChatGPT, Perplexity, Google AI Overviews and other generative answers.',
  },
  {
    number: '02',
    title: 'Structured Data & Schema',
    description:
      'Whether your product, collection and organisation markup gives AI systems the details they need to cite you accurately.',
  },
  {
    number: '03',
    title: 'Content & Entity Signals',
    description:
      'How clearly your site explains what you sell, who you are and why an answer engine should recommend you over a competitor.',
  },
  {
    number: '04',
    title: 'Prioritised Next Steps',
    description:
      'A short, ordered list of the changes most likely to improve how often your store appears in AI-generated recommendations.',
  },
] as const;

export function AiVisibilityAuditHero() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formToken, setFormToken] = useState('');
  const [captchaSiteKey, setCaptchaSiteKey] = useState<string | null>(null);

  const nonce = useNonce();
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const captchaWidgetIdRef = useRef<string | undefined>(undefined);

  const refreshFormToken = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINT, {
        headers: {accept: 'application/json'},
        cache: 'no-store',
        credentials: 'same-origin',
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        token?: string;
        captchaSiteKey?: string | null;
      };

      setFormToken(data.token ?? '');
      setCaptchaSiteKey(data.captchaSiteKey ?? null);
    } catch {
      // Without a token the server answers "form expired" and we fetch again.
    }
  }, []);

  useEffect(() => {
    void refreshFormToken();
  }, [refreshFormToken]);

  useEffect(() => {
    const container = captchaContainerRef.current;

    if (!captchaSiteKey || !container) return;

    let cancelled = false;

    loadTurnstile(nonce)
      .then((turnstile) => {
        if (cancelled || captchaWidgetIdRef.current) return;

        captchaWidgetIdRef.current = turnstile.render(container, {
          sitekey: captchaSiteKey,
          action: CAPTCHA_ACTION,
          // Stays invisible unless Cloudflare needs the visitor to interact.
          appearance: 'interaction-only',
          'response-field-name': 'cf-turnstile-response',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setSubmitError(
            'The security check could not load. Please disable any content blockers for this page and refresh.',
          );
        }
      });

    return () => {
      cancelled = true;

      if (captchaWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(captchaWidgetIdRef.current);
      }

      captchaWidgetIdRef.current = undefined;
    };
  }, [captchaSiteKey, nonce]);

  /** CAPTCHA solves are single use; any failed or finished submission needs a new one. */
  function resetCaptcha() {
    if (captchaWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(captchaWidgetIdRef.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (
      captchaSiteKey &&
      !(
        captchaWidgetIdRef.current &&
        window.turnstile?.getResponse(captchaWidgetIdRef.current)
      )
    ) {
      setSubmitError(
        'Please wait a moment for the security check to finish, then try again.',
      );

      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    let result: {ok?: boolean; error?: string; code?: string} = {};
    let response: Response;

    try {
      response = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        credentials: 'same-origin',
      });
    } catch {
      setIsSubmitting(false);
      setSubmitError(
        'We could not reach our servers. Please check your connection and try again.',
      );

      // Request never landed — keep the form intact so it can be retried.
      return;
    }

    try {
      result = (await response.json()) as typeof result;
    } catch {
      result = {};
    }

    setIsSubmitting(false);
    resetCaptcha();

    if (!response.ok || !result.ok) {
      if (result.code === 'form_expired') {
        void refreshFormToken();
      }

      setSubmitError(
        result.error ||
          'We could not submit your request. Please try again or email info@thefoldtech.com.',
      );

      return;
    }

    setIsSubmitted(true);
    form.reset();
  }

  return (
    <section className="ft-audit-hero">
      <div className="ft-audit-hero__gradient" aria-hidden="true" />

      <div className="ft-audit-hero__container">
        <div className="ft-audit-hero__grid">
          <div className="ft-audit-hero__left">
            <p className="ft-audit-hero__eyebrow">Free AI Visibility Audit</p>

            <h1 className="ft-audit-hero__title">
              Find out how AI search sees your store
            </h1>

            <p className="ft-audit-hero__description">
              Shoppers increasingly ask ChatGPT, Perplexity and Google AI
              Overviews what to buy. Tell us your website and our team will
              find out how AI search sees your brand and how it shows up in
              those answers, then send you a free audit with the changes worth making first.
            </p>

            <ul className="ft-audit-hero__checks">
              {AUDIT_CHECKS.map((check) => (
                <li className="ft-audit-hero__check" key={check.number}>
                  <span className="ft-audit-hero__check-number">
                    {check.number}
                  </span>

                  <div className="ft-audit-hero__check-body">
                    <h2 className="ft-audit-hero__check-title">
                      {check.title}
                    </h2>

                    <p className="ft-audit-hero__check-text">
                      {check.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-audit-hero__form-card">
            {isSubmitted ? (
              <div
                className="ft-audit-form__thanks"
                role="status"
                aria-live="polite"
              >
                <h2 className="ft-audit-form__thanks-title">
                  Your audit request is in
                </h2>

                <p className="ft-audit-form__thanks-text">
                  Thanks — we&apos;ve received your details. A member of the
                  FoldTech team will review your store and send your free AI
                  visibility audit within 3 working days.
                </p>

                <button
                  type="button"
                  className="ft-audit-form__thanks-reset"
                  onClick={() => {
                    // The previous token was spent by the successful submission.
                    void refreshFormToken();
                    setIsSubmitted(false);
                  }}
                >
                  Request another audit
                </button>
              </div>
            ) : null}

            <form
              hidden={isSubmitted}
              className="ft-audit-form"
              onSubmit={(event) => {
                void handleSubmit(event);
              }}
            >
              <h2 className="ft-audit-form__title">Request your free audit</h2>

              <p className="ft-audit-form__subtitle">
                No cost, no commitment. We&apos;ll email your report.
              </p>

              <div className="ft-audit-form__row ft-audit-form__row--split">
                <AuditInput
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={100}
                  required
                />

                <AuditInput
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={100}
                  required
                />
              </div>

              <div className="ft-audit-form__row">
                <AuditInput
                  label="Work Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>

              <div className="ft-audit-form__row">
                <AuditInput
                  label="Website To Audit"
                  name="website"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="yourstore.com"
                  maxLength={500}
                  required
                />
              </div>

              <div className="ft-audit-form__row ft-audit-form__row--split">
                <AuditInput
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  maxLength={200}
                />

                <AuditSelect
                  label="Platform"
                  name="platform"
                  placeholder="Please select"
                  options={PLATFORM_OPTIONS}
                />
              </div>

              {/*
                Honeypot: hidden from people and assistive tech, irresistible
                to bots. A filled value is silently discarded server-side.
              */}
              <div className="ft-audit-form__honeypot" aria-hidden="true">
                <label htmlFor="ft-audit-companyFax">Company fax</label>

                <input
                  id="ft-audit-companyFax"
                  name="companyFax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <input type="hidden" name="formToken" value={formToken} />

              {/* Turnstile mounts here; it only becomes visible if a challenge is needed. */}
              {captchaSiteKey ? (
                <div
                  ref={captchaContainerRef}
                  className="ft-audit-form__captcha"
                />
              ) : null}

              {/*
                Opt-in must be an affirmative action, so the box starts
                unticked (GDPR / Shopify customer privacy requirements).
              */}
              <label className="ft-audit-form__consent">
                <input type="checkbox" name="marketingConsent" value="yes" />

                <span>
                  Email me ecommerce and AI search insights from FoldTech. You
                  can unsubscribe at any time.
                </span>
              </label>

              {submitError ? (
                <p className="ft-audit-form__error" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                className="ft-audit-form__submit"
                type="submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting ? 'Sending…' : 'Get my free audit'}
                </span>

                <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path
                    d="M0.89 9.243L9.373 0.757M9.373 0.757H1.596M9.373 0.757V8.536"
                    stroke="currentColor"
                  />
                </svg>
              </button>

              <p className="ft-audit-form__note">
                We only use your details to prepare and send your audit.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AuditInputProps {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'url' | 'email' | 'text';
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

function AuditInput({
  label,
  name,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
  maxLength,
  required = false,
}: AuditInputProps) {
  const id = `ft-audit-${name}`;

  return (
    <div>
      <label className="ft-audit-form__label" htmlFor={id}>
        {label}

        {required ? <span className="ft-audit-form__required">*</span> : null}
      </label>

      <input
        id={id}
        className="ft-audit-form__input"
        type={type}
        name={name}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}

interface AuditSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
}

function AuditSelect({
  label,
  name,
  placeholder,
  options,
  required = false,
}: AuditSelectProps) {
  const id = `ft-audit-${name}`;

  return (
    <div>
      <label className="ft-audit-form__label" htmlFor={id}>
        {label}

        {required ? <span className="ft-audit-form__required">*</span> : null}
      </label>

      <select
        id={id}
        className="ft-audit-form__select"
        name={name}
        required={required}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
