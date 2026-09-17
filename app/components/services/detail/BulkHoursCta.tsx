import {Link} from 'react-router';
import {Money} from '@shopify/hydrogen';
import {
  ArrowIcon,
  BULK_HOURS_PATH,
  getSubscription,
  type BulkHoursProduct,
} from '~/components/BulkHours';

const MAX_HOURS = 100;
const PRESETS = [10, 25, 40, 50, 60, 80, 100];
const TICKS = Array.from({length: MAX_HOURS}, (_, index) => index + 1);

/** Left offset of an hour on the 1–100 scale, as a percentage. */
const positionOf = (hours: number) => ((hours - 1) / (MAX_HOURS - 1)) * 100;

/**
 * Bulk hours section closing every service page. The scale mirrors the
 * product page's 1–100 hours slider: each preset opens the product page with
 * those hours already selected.
 */
export function BulkHoursCta({
  product,
  serviceName,
}: {
  product: BulkHoursProduct;
  serviceName?: string;
}) {
  const variant = product.selectedOrFirstAvailableVariant;

  if (!variant) return null;

  const subscription = getSubscription(variant);
  const saving = subscription
    ? Math.round(
        (1 -
          Number(subscription.price.amount) / Number(variant.price.amount)) *
          100,
      )
    : 0;

  return (
    <section
      className="ft-bulk-hours-cta"
      aria-labelledby="ft-bulk-hours-cta-title"
    >
      <div className="ft-bulk-hours-cta__top">
        <div className="ft-bulk-hours-cta__intro">
          <p className="ft-bulk-hours-cta__eyebrow">Bulk hours</p>
          <h2
            className="ft-bulk-hours-cta__title"
            id="ft-bulk-hours-cta-title"
          >
            Buy bulk hours for your project.
          </h2>
        </div>

        <div className="ft-bulk-hours-cta__details">
          <p className="ft-bulk-hours-cta__text">
            Use them on {serviceName ?? 'this service'} or any other service we
            offer. Hours never expire, and every hour is logged on your
            timesheet.
          </p>

          <dl className="ft-bulk-hours-cta__rates">
            <div>
              <dt>One-time purchase</dt>
              <dd>
                <Money as="span" data={variant.price} /> per hour
              </dd>
            </div>
            {subscription ? (
              <div>
                <dt>
                  Monthly subscription
                  {saving > 0 ? <span>Save {saving}%</span> : null}
                </dt>
                <dd>
                  <Money as="span" data={subscription.price} /> per hour
                </dd>
              </div>
            ) : null}
          </dl>

          <Link
            className="ft-bulk-hours-cta__button"
            to={BULK_HOURS_PATH}
            prefetch="intent"
          >
            <span>Choose your hours</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <div className="ft-bulk-hours-cta__scale">
        <p className="ft-bulk-hours-cta__scale-label">
          Or start with a block of hours
        </p>

        <div className="ft-bulk-hours-cta__ruler" aria-hidden="true">
          {TICKS.map((tick) => (
            <span className="ft-bulk-hours-cta__tick" key={tick} />
          ))}
          <Marker className="ft-bulk-hours-cta__marker--rest" />
        </div>

        <ul className="ft-bulk-hours-cta__presets">
          {PRESETS.map((hours) => (
            <li
              key={hours}
              style={{'--at': positionOf(hours)} as React.CSSProperties}
            >
              <span className="ft-bulk-hours-cta__line" aria-hidden="true" />
              <Marker className="ft-bulk-hours-cta__marker--drive" />
              <Link
                to={`${BULK_HOURS_PATH}?hours=${hours}`}
                prefetch="intent"
              >
                {hours} hours
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The laptop that rides along the hours line. */
function Marker({className}: {className: string}) {
  return (
    <span
      className={`ft-bulk-hours-cta__marker ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="4.5"
          y="5"
          width="15"
          height="10.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M2.5 18.5h19M10 12.5 8.5 11l1.5-1.5M14 9.5l1.5 1.5-1.5 1.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
