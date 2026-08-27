import {
  useCallback,
  useState,
  type FormEvent,
} from 'react';
import {VideoModal} from '~/components/shared/VideoModal';
import {
  WORK_HERO_LOGOS,
  WORK_HERO_TESTIMONIAL,
} from '~/data/workHeroProof';

// TEMP development placeholders — replace with verified FoldTech stats before launch.
const CONTACT_STATS = [
  {
    value: '42%',
    label: 'Avg. conversion uplift',
  },
  {
    value: '120+',
    label: 'Ecommerce projects supported',
  },
  {
    value: '38%',
    label: 'Avg. organic growth',
  },
  {
    value: '27%',
    label: 'Avg. customer growth',
  },
] as const;

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
] as const;

const SERVICE_OPTIONS = [
  'Shopify Development',
  'Shopify Plus',
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
  'Shopify',
  'Other',
] as const;

export function ContactHero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [status, setStatus] = useState('');

  const closeVideo = useCallback(() => {
    setVideoOpen(false);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const firstName = String(data.get('firstName') ?? '').trim();
    const lastName = String(data.get('lastName') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const budget = String(data.get('budget') ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const source = String(data.get('source') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const marketing =
      data.get('marketingConsent') === 'on' ? 'Yes' : 'No';

    const subject = 'New FoldTech Website Enquiry';

    const body = [
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
    ].join('\n');

    const mailtoUrl =
      `mailto:info@thefoldtech.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setStatus('Opening your email app…');

    window.location.href = mailtoUrl;
  }

  return (
    <>
      <section className="ft-contact-hero">
        <div
          className="ft-contact-hero__gradient"
          aria-hidden="true"
        />

        <div className="ft-contact-hero__container">
          <div className="ft-contact-hero__grid">
            <div className="ft-contact-hero__left">
              <div className="ft-contact-hero__content">
                <h1 className="ft-contact-hero__title">
                  Let&apos;s grow your Shopify store
                </h1>

                <p className="ft-contact-hero__description">
                  Tell us about your goals and our team will help you
                  plan the right Shopify, SEO, CRO or ecommerce
                  solution for your next stage of growth.
                </p>

                <div className="ft-contact-hero__response">
                  <span
                    className="ft-contact-hero__response-dot"
                    aria-hidden="true"
                  />

                  <span>Typically replies within 24 hours</span>
                </div>
              </div>

              <div className="ft-contact-hero__testimonial-wrap">
                <button
                  type="button"
                  className="ft-contact-hero__testimonial"
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Hear from ${WORK_HERO_TESTIMONIAL.person}`}
                >
                  <img
                    className="ft-contact-hero__testimonial-image"
                    src={WORK_HERO_TESTIMONIAL.image}
                    alt={`${WORK_HERO_TESTIMONIAL.person} - ${WORK_HERO_TESTIMONIAL.company}`}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="ft-contact-hero__testimonial-body">
                    <p className="ft-contact-hero__testimonial-quote">
                      “{WORK_HERO_TESTIMONIAL.quote}”
                    </p>

                    <span className="ft-contact-hero__testimonial-cta">
                      <PlayIcon />

                      Hear from {WORK_HERO_TESTIMONIAL.person}
                    </span>
                  </div>
                </button>
              </div>

              <div className="ft-contact-hero__stats">
                {CONTACT_STATS.map((stat) => (
                  <div
                    className="ft-contact-hero__stat"
                    key={stat.label}
                  >
                    <p className="ft-contact-hero__stat-number">
                      {stat.value}
                    </p>

                    <p className="ft-contact-hero__stat-label">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="ft-contact-hero__logos">
                <p className="ft-contact-hero__logos-label">
                  Trusted by ecommerce brands
                </p>

                <div className="ft-contact-hero__logos-window">
                  <div className="ft-contact-hero__logos-track">
                    {[...WORK_HERO_LOGOS, ...WORK_HERO_LOGOS].map(
                      (logo, index) => (
                        <div
                          className="ft-contact-hero__logo"
                          key={`${logo.alt}-${index}`}
                          aria-hidden={
                            index >= WORK_HERO_LOGOS.length
                          }
                        >
                          <img
                            src={logo.src}
                            alt={
                              index < WORK_HERO_LOGOS.length
                                ? logo.alt
                                : ''
                            }
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="ft-contact-hero__form-card">
              <form
                className="ft-contact-form"
                onSubmit={handleSubmit}
              >
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
                    <span className="ft-contact-form__required">
                      *
                    </span>
                  </label>

                  <textarea
                    id="ft-contact-message"
                    name="message"
                    className="ft-contact-form__textarea"
                    rows={4}
                    placeholder="Goals, timelines, what you're stuck on..."
                    required
                  />
                </div>

                <div
                  className="ft-contact-form__honeypot"
                  aria-hidden="true"
                >
                  <label htmlFor="ft-contact-website">
                    Website URL
                  </label>

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
                    Join our ecommerce newsletter for Shopify, SEO
                    and growth insights.
                  </span>
                </label>

                <p className="ft-contact-form__consent">
                  By submitting this form, you agree that FoldTech
                  may use your details to respond to your enquiry.{' '}
                  <a href="/policies/privacy-policy">
                    Privacy Policy
                  </a>
                  .
                </p>

                <button
                  type="submit"
                  className="ft-contact-form__submit"
                >
                  Submit Enquiry

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
              </form>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        open={videoOpen}
        src={WORK_HERO_TESTIMONIAL.video}
        ariaLabel={`${WORK_HERO_TESTIMONIAL.person} testimonial video`}
        onClose={closeVideo}
      />
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
}

function ContactSelect({
  label,
  name,
  placeholder,
  options,
  required = false,
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
        defaultValue=""
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

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        stroke="currentColor"
      />

      <path
        d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z"
        fill="currentColor"
      />
    </svg>
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