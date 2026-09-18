import {useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {BulkHoursQuery} from 'storefrontapi.generated';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {CONTACT_CLEAN_PATH} from '~/lib/route-mappings';
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
          <span className="ft-bulk-hours__plan-name">One-time</span>
          <span className="ft-bulk-hours__plan-price">
            <Money as="span" data={variant.price} />
            /hr
          </span>
        </label>

        {subscription ? (
          <label className="ft-bulk-hours__plan">
            <input
              type="radio"
              name="ft-bulk-hours-plan"
              checked={isSubscription}
              onChange={() => choosePlan(true)}
            />
            <span className="ft-bulk-hours__plan-name">
              Subscribe &amp; Save
              {savingPercent > 0 ? (
                <span className="ft-bulk-hours__saving">
                  Save {savingPercent}%
                </span>
              ) : null}
            </span>
            <span className="ft-bulk-hours__plan-price">
              <Money as="span" data={subscription.price} />
              /hr
            </span>
          </label>
        ) : null}
      </fieldset>

      {/* Rate and total, each shown against what the one-time plan would
          cost, so the saving is read rather than worked out. */}
      <div className="ft-bulk-hours__price">
        <div
          className={`ft-bulk-hours__figures${
            showCompare ? ' ft-bulk-hours__figures--compare' : ''
          }`}
        >
          <p className="ft-bulk-hours__now-total">
            <Money as="span" data={total} />
            <span className="ft-bulk-hours__cadence">
              {isSubscription ? 'total' : 'total'}
            </span>
          </p>

          {showCompare ? (
            <p className="ft-bulk-hours__was-total">
              <Money as="span" data={oneTimeTotal} />
            </p>
          ) : null}

          <p className="ft-bulk-hours__rate">
            <Money as="span" data={unitPrice} />
            <span className="ft-bulk-hours__rate-unit">/Hour</span>
          </p>

          {showCompare ? (
            <p className="ft-bulk-hours__was-rate">
              <Money as="span" data={variant.price} />
              /Hour
            </p>
          ) : null}
        </div>

        {showCompare && saving ? (
          <p className="ft-bulk-hours__save">
            <span>
              You Saved total of  {' '}
              <strong>
                <Money as="span" data={saving} />
              </strong>
            </span>
            on subscription
          </p>
        ) : null}
      </div>  

      <div
        className="ft-bulk-hours__hours"
        style={{'--progress': progress} as React.CSSProperties}
      >
        <div className="ft-bulk-hours__hours-row">
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
              <span>{rules.min}</span>
              <span>{rules.max}</span>
            </div>
          </div>
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
              <span>Add {hoursLabel} to cart</span>
              <ArrowIcon className="ft-bulk-hours__buy-arrow" />
            </>
          ) : (
            'Currently unavailable'
          )}
        </AddToCartButton>
      </div>

      <p className="ft-bulk-hours__quote">
        Need more than {MAX_HOURS} hours?{' '}
        <Link to={CONTACT_CLEAN_PATH}>Ask for a quote</Link>
      </p>
    </div>
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
