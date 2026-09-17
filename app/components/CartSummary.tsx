import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {Money, type OptimisticCart} from '@shopify/hydrogen';
import {ArrowIcon} from '~/components/BulkHours';

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

  return (
    <div className={className}>
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
      <p className="cart-summary-note">Taxes are calculated at checkout.</p>
      {cart?.checkoutUrl ? (
        <a className="cart-button" href={cart.checkoutUrl} target="_self">
          <span>Checkout</span>
          <ArrowIcon />
        </a>
      ) : null}
    </div>
  );
}
