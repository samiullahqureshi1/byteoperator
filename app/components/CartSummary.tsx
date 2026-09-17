import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {Money, type OptimisticCart} from '@shopify/hydrogen';
import {ArrowIcon} from '~/components/BulkHours';
import {getMonthlySaving} from '~/components/CartLineItem';

const NEXT_STEPS = [
  'Pay securely on Shopify checkout.',
  'Your Success Manager calls to plan the work.',
  'Track progress on your project board and timesheet.',
];

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

/*
 * ponytail: no discount or gift card fields. Shopify checkout still accepts
 * codes, so add them back here only if they need to be entered in the cart.
 */
export function CartSummary({cart, layout}: CartSummaryProps) {
  const className = `cart-summary cart-summary-${layout}`;
  const savingCents = (cart?.lines?.nodes ?? []).reduce((cents, line) => {
    const saving = getMonthlySaving(line);
    return saving ? cents + Math.round(Number(saving.amount) * 100) : cents;
  }, 0);

  return (
    <div className={className}>
      {layout === 'page' ? (
        <h2 className="cart-summary-title">Order summary</h2>
      ) : null}
      <dl className="cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {savingCents > 0 && cart?.cost?.subtotalAmount ? (
        <p className="cart-summary-saving">
          You save{' '}
          <strong>
            <Money
              as="span"
              data={{
                ...cart.cost.subtotalAmount,
                amount: (savingCents / 100).toFixed(2),
              }}
            />
          </strong>{' '}
          every month.
        </p>
      ) : null}
      <p className="cart-summary-note">Taxes are calculated at checkout.</p>
      {cart?.checkoutUrl ? (
        <a className="cart-button" href={cart.checkoutUrl} target="_self">
          <span>Checkout</span>
          <ArrowIcon />
        </a>
      ) : null}
      {layout === 'page' ? (
        <div className="cart-next">
          <h3>What happens next</h3>
          <ol>
            {NEXT_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
