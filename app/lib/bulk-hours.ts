/*
 * Hour rules for the bulk hours product, shared by the product page and the
 * cart so both allow the same quantities:
 *   one-time purchase     1–100 hours, in steps of 1
 *   monthly subscription  5–100 hours, in steps of 5
 * Kept free of imports so `scripts/check-bulk-hours.ts` can run it in Node.
 */

export const MAX_HOURS = 100;

export function hourRules(subscription: boolean) {
  return subscription
    ? {min: 5, step: 5, max: MAX_HOURS}
    : {min: 1, step: 1, max: MAX_HOURS};
}

/** The nearest allowed number of hours for the plan. */
export function snapHours(value: number, subscription: boolean) {
  const {min, step, max} = hourRules(subscription);
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value / step) * step));
}

/**
 * The hours to show after switching plan.
 *
 * Going monthly forces at least the monthly minimum, which is the plan's rule
 * rather than anything the visitor picked. `oneTimeHours` carries what they
 * actually chose on the one-time plan so it can be restored on the way back -
 * without it, that forced minimum sticks and one-time starts at 5, not 1.
 */
export function hoursOnPlanSwitch(
  current: number,
  oneTimeHours: number,
  monthly: boolean,
) {
  return monthly ? snapHours(current, true) : snapHours(oneTimeHours, false);
}

/** The next allowed number of hours up (1) or down (-1) from `value`. */
export function stepHours(
  value: number,
  subscription: boolean,
  direction: 1 | -1,
) {
  const {min, step, max} = hourRules(subscription);
  const next =
    direction === 1
      ? Math.floor(value / step) * step + step
      : Math.ceil(value / step) * step - step;
  return Math.min(max, Math.max(min, next));
}

type Money = {amount: string};

/** `money` × `quantity`, worked out in cents so it doesn't drift. */
export function multiplyMoney<T extends Money>(money: T, quantity: number): T {
  const cents = Math.round(Number(money.amount) * 100) * quantity;
  return {...money, amount: (cents / 100).toFixed(2)};
}

/** `a` − `b`, in cents. */
export function subtractMoney<T extends Money>(a: T, b: Money): T {
  const cents = Math.round(Number(a.amount) * 100) - Math.round(Number(b.amount) * 100);
  return {...a, amount: (cents / 100).toFixed(2)};
}
