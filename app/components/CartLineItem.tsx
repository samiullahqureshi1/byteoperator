import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout, LineItemChildrenMap} from '~/components/CartMain';
import {
  CartForm,
  Image,
  Money,
  type OptimisticCartLine,
} from '@shopify/hydrogen';
import {ProductPrice} from './ProductPrice';
import {BULK_HOURS_HANDLE, BULK_HOURS_IMAGE} from './BulkHours';
import {
  hourRules,
  multiplyMoney,
  snapHours,
  stepHours,
  subtractMoney,
} from '~/lib/bulk-hours';
import type {
  CartApiQueryFragment,
  CartLineFragment,
} from 'storefrontapi.generated';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/** What a subscribed bulk hours line saves each month against one-time pricing. */
export function getMonthlySaving(line: CartLine) {
  const unitPrice = line.cost?.amountPerQuantity;
  if (
    line.merchandise.product.handle !== BULK_HOURS_HANDLE ||
    !line.sellingPlanAllocation ||
    !unitPrice
  ) {
    return null;
  }
  const saving = multiplyMoney(
    subtractMoney(line.merchandise.price, unitPrice),
    line.quantity,
  );
  return Number(saving.amount) > 0 ? saving : null;
}

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * If the line is a parent line that has child components (like warranties or gift wrapping), they are
 * rendered nested below the parent line.
 */
export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;
  const isBulkHours = product.handle === BULK_HOURS_HANDLE;
  const isSubscription = Boolean(line.sellingPlanAllocation);
  const unitPrice = line.cost?.amountPerQuantity;
  const monthlySaving = getMonthlySaving(line);

  // A one-time bulk hours line can switch to the monthly plan in place.
  const monthlyPlan =
    isBulkHours && !isSubscription
      ? merchandise.sellingPlanAllocations?.nodes[0]
      : undefined;
  const monthlyPrice = monthlyPlan?.priceAdjustments[0]?.price;
  const monthlyHours = snapHours(line.quantity, true);
  const switchSaving = monthlyPrice
    ? multiplyMoney(
        subtractMoney(merchandise.price, monthlyPrice),
        monthlyHours,
      )
    : null;

  return (
    <li key={id} className="cart-line">
      <div className="cart-line-inner">
        {image ? (
          <Image
            className="cart-line-image"
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
        ) : isBulkHours ? (
          <img
            className="cart-line-image"
            src={BULK_HOURS_IMAGE.src}
            alt=""
            width={100}
            height={100}
            loading="lazy"
          />
        ) : null}

        <div className="cart-line-details">
          <div className="cart-line-heading">
            <p className="cart-line-title">{product.title}</p>
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
          <ul className="cart-line-meta">
            {/*
              Line attributes carry the service the hours were booked for.
              Shown here so the customer can check it before paying — it is
              the same value the admin sees on the order.
            */}
            {line.attributes?.map((attribute) =>
              attribute.value ? (
                <li className="cart-line-attribute" key={attribute.key}>
                  {attribute.key}: {attribute.value}
                </li>
              ) : null,
            )}
            <li className="cart-line-plan">
              {line.sellingPlanAllocation
                ? line.sellingPlanAllocation.sellingPlan.name
                : 'One-time purchase'}
            </li>
            {unitPrice?.amount ? (
              <li>
                {line.quantity}
                {isBulkHours ? ' hours' : ''} &times;{' '}
                <Money as="span" data={unitPrice} />
              </li>
            ) : null}
            {monthlySaving ? (
              <li className="cart-line-saving">
                You save{' '}
                <strong>
                  <Money as="span" data={monthlySaving} />
                </strong>{' '}
                a month
              </li>
            ) : null}
            {monthlyPlan && switchSaving && Number(switchSaving.amount) > 0 ? (
              <li className="cart-line-offer">
                <CartLineUpdateButton
                  lines={[
                    {
                      id,
                      quantity: monthlyHours,
                      sellingPlanId: monthlyPlan.sellingPlan.id,
                    },
                  ]}
                >
                  <button
                    className="cart-line-switch"
                    type="submit"
                    disabled={!!line.isOptimistic}
                  >
                    Switch to monthly
                  </button>
                </CartLineUpdateButton>{' '}
                and save{' '}
                <strong>
                  <Money as="span" data={switchSaving} />
                </strong>{' '}
                a month
                {monthlyHours !== line.quantity
                  ? ` on ${monthlyHours} hours`
                  : ''}
                .
              </li>
            ) : null}
            {selectedOptions
              // Single-variant products report a placeholder option.
              .filter((option) => option.value !== 'Default Title')
              .map((option) => (
                <li key={option.name}>
                  <small>
                    {option.name}: {option.value}
                  </small>
                </li>
              ))}
          </ul>
          <CartLineQuantity
            line={line}
            rules={isBulkHours ? {subscription: isSubscription} : undefined}
          />
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="cart-line-children">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({
  line,
  rules,
}: {
  line: CartLine;
  /** Bulk hours lines follow the plan's hour rules (see ~/lib/bulk-hours). */
  rules?: {subscription: boolean};
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const limits = rules ? hourRules(rules.subscription) : null;
  const prevQuantity = rules
    ? stepHours(quantity, rules.subscription, -1)
    : Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = rules
    ? stepHours(quantity, rules.subscription, 1)
    : Number((quantity + 1).toFixed(0));
  const stepLabel =
    limits && limits.step > 1 ? `${limits.step} hours` : 'quantity';

  return (
    <div className="cart-line-quantity">
      <div className="cart-line-stepper">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label={`Decrease ${stepLabel}`}
            disabled={quantity <= (limits?.min ?? 1) || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
          >
            &#8722;
          </button>
        </CartLineUpdateButton>
        <span>
          <span className="sr-only">Quantity </span>
          {quantity}
        </span>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label={`Increase ${stepLabel}`}
            name="increase-quantity"
            value={nextQuantity}
            disabled={
              (limits ? quantity >= limits.max : false) || !!isOptimistic
            }
          >
            &#43;
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button className="cart-line-remove" disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
