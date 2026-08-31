import {useState, type FormEvent} from 'react';
import {Link} from 'react-router';

type FormStatus =
  | 'idle'
  | 'pending'
  | 'success'
  | 'error';

const FALLBACK_ERROR =
  'We could not sign you up right now. Please try again.';

export function HomeObservatory() {
  const [status, setStatus] =
    useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (status === 'pending') {
      return;
    }

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('pending');
    setMessage('Signing you up…');

    try {
      const response = await fetch(
        '/api/newsletter-subscribe',
        {
          method: 'POST',
          body: new FormData(form),
        },
      );

      let result: {
        ok?: boolean;
        error?: string;
      } = {};

      try {
        result = (await response.json()) as {
          ok?: boolean;
          error?: string;
        };
      } catch {
        result = {};
      }

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error || FALLBACK_ERROR,
        );
      }

      form.reset();
      setStatus('success');
      setMessage(
        'You are on the list. The next monthly report lands in your inbox.',
      );
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : FALLBACK_ERROR,
      );
    }
  }

  return (
    <section
      className="ft-home-observatory"
      aria-labelledby="ft-home-observatory-title"
    >
      <div className="ft-home-observatory__inner">
        <div className="ft-home-observatory__left">
          <div className="ft-home-observatory__eyebrow">
            <FlaskIcon />

            <span>FoldTech Observatory</span>
          </div>

          <h2
            className="ft-home-observatory__title"
            id="ft-home-observatory-title"
          >
            The FoldTech{' '}
            <em>Observatory.</em>
          </h2>

          <p className="ft-home-observatory__description">
  Shopify SEO, AI search data, CRO insights and ecommerce
  news — practical ideas for growing online stores. Free,
  once a month.
</p>

          <div className="ft-home-observatory__stats">
            <div className="ft-home-observatory__stat ft-home-observatory__stat--primary">
              <span className="ft-home-observatory__stat-value">
                SEO + CRO
              </span>

              <span className="ft-home-observatory__stat-label">
                Focus
              </span>
            </div>

            <div className="ft-home-observatory__stat">
              <span className="ft-home-observatory__stat-value">
                Monthly
              </span>

              <span className="ft-home-observatory__stat-label">
                Cadence
              </span>
            </div>

            <div className="ft-home-observatory__stat">
              <span className="ft-home-observatory__stat-value">
                Free
              </span>

              <span className="ft-home-observatory__stat-label">
                Access
              </span>
            </div>
          </div>
        </div>

        <div className="ft-home-observatory__card">
          <span className="ft-home-observatory__card-label">
            Get the monthly report
          </span>

          <form
            className="ft-home-observatory__form"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
          >
            <label
              className="ft-home-observatory__sr-only"
              htmlFor="ft-observatory-email"
            >
              Email address
            </label>

            <input
              className="ft-home-observatory__input"
              id="ft-observatory-email"
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              required
            />

            <button
              className="ft-home-observatory__button"
              type="submit"
            >
              <span>Get monthly access</span>

              <ArrowIcon />
            </button>

            {message ? (
              <p
                className="ft-home-observatory__status"
                role="status"
              >
                {message}
              </p>
            ) : null}
          </form>

          <p className="ft-home-observatory__fine">
            Monthly send · Unsubscribe any time ·{' '}
            <Link
              to="/policies/privacy-policy"
              prefetch="intent"
            >
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function FlaskIcon() {
  return (
    <svg
      className="ft-home-observatory__eyebrow-icon"
      viewBox="0 0 11 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 1V5L1 9.5A1.5 1.5 0 0 0 2.5 11H8.5A1.5 1.5 0 0 0 10 9.5L7.5 5V1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M3 1H8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="ft-home-observatory__button-arrow"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5H12.5M8.5 3.5L12.5 7.5L8.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
