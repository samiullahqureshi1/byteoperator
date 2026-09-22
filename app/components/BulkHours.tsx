import {useEffect, useRef, useState} from 'react';
import {useSearchParams} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {BulkHoursQuery} from 'storefrontapi.generated';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {ContactForm} from './contact/ContactForm';
import {
  MAX_HOURS,
  hourRules,
  multiplyMoney,
  snapHours,
  stepHours,
  subtractMoney,
} from '~/lib/bulk-hours';

/*
 * The one product sold on the site. Prices are read from Shopify, not set
 * here: the variant price is the one-time hourly rate, and the first selling
 * plan (managed in the Shopify Subscriptions app) is the monthly rate.
 * Quantity is the number of hours, so a subscription renews every month for
 * the same hours with the card the customer saved at checkout.
 */
export const BULK_HOURS_HANDLE = 'buy-bulk-hours';
export const BULK_HOURS_PATH = `/products/${BULK_HOURS_HANDLE}`;

/*
 * Quick picks under the slider. Filtered against the plan's own rules, so
 * the monthly plan only ever offers amounts it can actually be set to.
 */
const HOUR_PRESETS = [1, 5, 10, 20, 40, 100];
const POPULAR_PRESET = 10;

/*
 * ponytail: a site photo stands in until the Shopify product has an image.
 * Upload one in Shopify admin and the product page and cart use it instead.
 */
export const BULK_HOURS_IMAGE = {
  src: '/images/about/values-team.webp',
  alt: 'The FoldTech team planning Shopify work around a table',
  width: 1970,
  height: 1306,
};

export type BulkHoursProduct = NonNullable<BulkHoursQuery['product']>;
type BulkHoursVariant = NonNullable<
  BulkHoursProduct['selectedOrFirstAvailableVariant']
>;

export function getSubscription(variant: BulkHoursVariant) {
  const plan = variant.sellingPlanAllocations.nodes[0];
  const price = plan?.priceAdjustments[0]?.price;
  return plan && price ? {plan: plan.sellingPlan, price} : null;
}

/** The arrow used on the site's pill buttons. */
export function ArrowIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.89 9.243L9.373 0.757M9.373 0.757H1.596M9.373 0.757V8.536"
        stroke="currentColor"
      />
    </svg>
  );
}

/** The purchase form on the product page. */
export function BulkHoursPanel({product}: {product: BulkHoursProduct}) {
  const variant = product.selectedOrFirstAvailableVariant;
  const {open} = useAside();
  const [searchParams] = useSearchParams();
  // `?hours=25` preselects hours, e.g. from the service pages' hour presets.
  const [hours, setHours] = useState(() =>
    snapHours(Number(searchParams.get('hours')), false),
  );
  const [subscribe, setSubscribe] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  // Text typed into the hours box, applied on blur or Enter so typing "15"
  // is not snapped to 10 after the "1".
  const [draft, setDraft] = useState<string | null>(null);

  if (!variant) return null;

  const subscription = getSubscription(variant);
  const isSubscription = subscribe && Boolean(subscription);
  const rules = hourRules(isSubscription);
  const unitPrice =
    isSubscription && subscription ? subscription.price : variant.price;
  const total = multiplyMoney(unitPrice, hours);
  const oneTimeTotal = multiplyMoney(variant.price, hours);

  // Prices compared on the nearest monthly amount of hours. When subscribed
  // that is the chosen hours; on one-time it shows what switching would cost.
  const monthlyHours = snapHours(hours, true);
  const savingPerHour = subscription
    ? subtractMoney(variant.price, subscription.price)
    : null;
  const saving =
    subscription && savingPerHour && Number(savingPerHour.amount) > 0
      ? multiplyMoney(savingPerHour, monthlyHours)
      : null;
  const savingPercent = subscription
    ? Math.round(
        (1 - Number(subscription.price.amount) / Number(variant.price.amount)) *
          100,
      )
    : 0;

  const progress = (hours - rules.min) / (rules.max - rules.min);
  const hoursLabel = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  const presets = HOUR_PRESETS.filter(
    (value) => value >= rules.min && value % rules.step === 0,
  );
  // Only the monthly plan is discounted, so only it has a "was" to show.
  const showCompare = isSubscription && Boolean(saving) && savingPercent > 0;

  function choosePlan(monthly: boolean) {
    setSubscribe(monthly);
    setHours((current) => snapHours(current, monthly));
    setDraft(null);
  }

  function applyDraft() {
    if (draft === null) return;
    setHours(snapHours(Number(draft), isSubscription));
    setDraft(null);
  }

  return (
    <div className="ft-bulk-hours">
    

      <fieldset className="ft-bulk-hours__plans">
        <legend className="sr-only">How would you like to pay?</legend>

        <label className="ft-bulk-hours__plan">
          <input
            type="radio"
            name="ft-bulk-hours-plan"
            checked={!isSubscription}
            onChange={() => choosePlan(false)}
          />
          <span className="ft-bulk-hours__plan-head">
            <span className="ft-bulk-hours__plan-mark" aria-hidden="true" />
            <span className="ft-bulk-hours__plan-name">One-time</span>
          </span>
          <span className="ft-bulk-hours__plan-price">
            <Money as="span" data={variant.price} />
            <span className="ft-bulk-hours__plan-unit">/ hour</span>
          </span>
          <span className="ft-bulk-hours__plan-text">
            Buy only the hours you need.
          </span>
          <span className="ft-bulk-hours__plan-foot">No recurring billing</span>
        </label>

        {subscription ? (
          <label className="ft-bulk-hours__plan">
            <input
              type="radio"
              name="ft-bulk-hours-plan"
              checked={isSubscription}
              onChange={() => choosePlan(true)}
            />
            <span className="ft-bulk-hours__plan-head">
              <span className="ft-bulk-hours__plan-mark" aria-hidden="true" />
              <span className="ft-bulk-hours__plan-name">Subscribe &amp; Save</span>
              <span className="ft-bulk-hours__plan-flag">Best value</span>
            </span>
            <span className="ft-bulk-hours__plan-price">
              <Money as="span" data={subscription.price} />
              <span className="ft-bulk-hours__plan-unit">/ hour</span>
              {savingPercent > 0 ? (
                <span className="ft-bulk-hours__saving">
                  Save {savingPercent}%
                </span>
              ) : null}
            </span>
            <span className="ft-bulk-hours__plan-text">
              The same number of hours added every month. Best for ongoing store
              support.
            </span>
            <span className="ft-bulk-hours__plan-foot">
              From {hourRules(true).min} hours a month &middot; Cancel anytime
            </span>
          </label>
        ) : null}
      </fieldset>

      {/* What this selection costs, stated once: the amount charged, the
          rate behind it, and what the one-time plan would have cost. */}
      <div className="ft-bulk-hours__price">
        <div className="ft-bulk-hours__figures">
          <p className="ft-bulk-hours__summary-label">
            {hoursLabel} {isSubscription ? 'every month' : 'one-time'}
          </p>
          <p className="ft-bulk-hours__now-total">
            <Money as="span" data={total} />
            {isSubscription ? (
              <span className="ft-bulk-hours__cadence">/mo</span>
            ) : null}
          </p>
          <p className="ft-bulk-hours__rate">
            <Money as="span" data={unitPrice} />
            <span className="ft-bulk-hours__rate-unit">
              /hour &middot; {isSubscription ? 'billed monthly' : 'paid once'}
            </span>
          </p>
        </div>

        {showCompare && saving ? (
          <p className="ft-bulk-hours__save">
            <span className="ft-bulk-hours__save-line">
              You save{' '}
              <strong>
                <Money as="span" data={saving} />
              </strong>{' '}
              every month
            </span>
            <s className="ft-bulk-hours__was-total">
              <Money as="span" data={oneTimeTotal} /> one-time
            </s>
          </p>
        ) : null}
      </div>

      <div
        className="ft-bulk-hours__hours"
        style={{'--progress': progress} as React.CSSProperties}
      >
        <div className="ft-bulk-hours__hours-head">
          <p className="ft-bulk-hours__hours-title">
            How many hours do you need?
          </p>
          <p className="ft-bulk-hours__hours-step">
            {isSubscription
              ? `Minimum ${rules.min} hours a month`
              : 'Any number of hours'}
          </p>
        </div>

        <div className="ft-bulk-hours__stepper">
          <button
            type="button"
            aria-label={
              isSubscription ? `Remove ${rules.step} hours` : 'Remove an hour'
            }
            disabled={hours <= rules.min}
            onClick={() => {
              setHours(stepHours(hours, isSubscription, -1));
              setDraft(null);
            }}
          >
            &minus;
          </button>
          <span className="ft-bulk-hours__stepper-field">
            <input
              type="number"
              inputMode="numeric"
              min={rules.min}
              max={rules.max}
              step={rules.step}
              value={draft ?? hours}
              aria-label="Number of hours"
              onChange={(event) => setDraft(event.target.value)}
              onBlur={applyDraft}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyDraft();
              }}
            />
            <span className="ft-bulk-hours__stepper-unit">
              {hours === 1 ? 'hour' : 'hours'}
              {isSubscription ? ' / month' : ''}
            </span>
          </span>
          <button
            type="button"
            aria-label={
              isSubscription ? `Add ${rules.step} hours` : 'Add an hour'
            }
            disabled={hours >= rules.max}
            onClick={() => {
              setHours(stepHours(hours, isSubscription, 1));
              setDraft(null);
            }}
          >
            +
          </button>
        </div>

        <div className="ft-bulk-hours__track">
          <input
            id="ft-bulk-hours-range"
            className="ft-bulk-hours__range"
            type="range"
            min={rules.min}
            max={rules.max}
            step={rules.step}
            value={hours}
            aria-label="Hours"
            onChange={(event) => {
              setHours(snapHours(event.target.valueAsNumber, isSubscription));
              setDraft(null);
            }}
          />
          <div className="ft-bulk-hours__scale" aria-hidden="true">
            <span>
              {rules.min} {rules.min === 1 ? 'hour' : 'hours'}
            </span>
            <span>{rules.max} hours</span>
          </div>
        </div>

        <div className="ft-bulk-hours__presets">
          {presets.map((value) => (
            <button
              className="ft-bulk-hours__preset"
              key={value}
              type="button"
              aria-pressed={hours === value}
              data-popular={value === POPULAR_PRESET ? 'true' : undefined}
              onClick={() => {
                setHours(value);
                setDraft(null);
              }}
            >
              {value} {value === 1 ? 'hour' : 'hours'}
            </button>
          ))}
        </div>
      </div>

      {saving && !isSubscription ? (
        <p className="ft-bulk-hours__note">
          {/* Names the plan the same way the toggle above does. */}
          <button type="button" onClick={() => choosePlan(true)}>
            Subscribe instead
          </button>{' '}
          and save{' '}
          <strong>
            <Money as="span" data={saving} />
          </strong>{' '}
          a month{monthlyHours !== hours ? ` on ${monthlyHours} hours` : ''}.
        </p>
      ) : null}

      <div className="ft-bulk-hours__buy">
        <AddToCartButton
          disabled={variant.availableForSale ? undefined : true}
          lines={[
            {
              merchandiseId: variant.id,
              quantity: hours,
              ...(isSubscription && subscription
                ? {sellingPlanId: subscription.plan.id}
                : {}),
            },
          ]}
          onClick={() => open('cart')}
        >
          {variant.availableForSale ? (
            <>
              <span>
                {isSubscription
                  ? `Subscribe for ${hours} hours/month`
                  : `Add ${hoursLabel} to cart`}
              </span>
              <ArrowIcon className="ft-bulk-hours__buy-arrow" />
            </>
          ) : (
            'Currently unavailable'
          )}
        </AddToCartButton>
      </div>

  

      <p className="ft-bulk-hours__quote">
        Need more than {MAX_HOURS} hours?{' '}
        <button type="button" onClick={() => setQuoteOpen(true)}>
          Ask for a quote
        </button>
      </p>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        hours={hours}
        isSubscription={isSubscription}
      />
    </div>
  );
}

/**
 * The contact form in a dialog, so asking for a quote never leaves the buy
 * panel. `enquirySource` is what tells the team the lead came from here
 * rather than the contact page, and the selection is pre-written into the
 * message so the quote can be priced without a reply.
 *
 * A native <dialog> rather than a portal: showModal() gives the top layer,
 * the focus trap and Escape-to-close without any of them being written here.
 */
function QuoteModal({
  open,
  onClose,
  hours,
  isSubscription,
}: {
  open: boolean;
  onClose: () => void;
  hours: number;
  isSubscription: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  const plan = isSubscription ? 'monthly subscription' : 'one-time';

  return (
    <dialog
      ref={ref}
      className="ft-quote-modal"
      aria-labelledby="ft-quote-modal-title"
      // Fires on Escape too, so this is the single close path.
      onClose={onClose}
    >
      <button
        type="button"
        className="ft-quote-modal__close"
        onClick={onClose}
        aria-label="Close the quote form"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" />
        </svg>
      </button>

      <h2 className="ft-quote-modal__title" id="ft-quote-modal-title">
        Ask for a quote
      </h2>

      <p className="ft-quote-modal__text">
        Tell us how many hours you need and we&apos;ll price it for you.
      </p>

      {/* Mounted only while open, so every visit starts on a blank form. */}
      {open ? (
        <ContactForm
          enquirySource="Bulk hours quote"
          defaultService="Support & Maintenance"
          defaultMessage={`I need more than ${MAX_HOURS} hours. I was looking at ${hours} ${
            hours === 1 ? 'hour' : 'hours'
          } on the ${plan} plan.`}
        />
      ) : null}
    </dialog>
  );
}

export const BULK_HOURS_QUERY = `#graphql
  query BulkHours(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      featuredImage {
        url
        altText
        width
        height
      }
      selectedOrFirstAvailableVariant(
        selectedOptions: []
        ignoreUnknownOptions: true
        caseInsensitiveMatch: true
      ) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        sellingPlanAllocations(first: 1) {
          nodes {
            sellingPlan {
              id
              name
            }
            priceAdjustments {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
` as const;
