// Checks the bulk hours quantity and money rules. Run: node scripts/check-bulk-hours.ts
import assert from 'node:assert/strict';
import {
  hoursOnPlanSwitch,
  multiplyMoney,
  snapHours,
  stepHours,
  subtractMoney,
} from '../app/lib/bulk-hours.ts';

// One-time: 1–100 in steps of 1.
assert.equal(snapHours(0, false), 1);
assert.equal(snapHours(Number.NaN, false), 1);
assert.equal(snapHours(37, false), 37);
assert.equal(snapHours(250, false), 100);
assert.equal(stepHours(1, false, -1), 1);
assert.equal(stepHours(37, false, 1), 38);

// Monthly: 5–100 in steps of 5.
assert.equal(snapHours(1, true), 5);
assert.equal(snapHours(12, true), 10);
assert.equal(snapHours(13, true), 15);
assert.equal(snapHours(100, true), 100);
assert.equal(stepHours(5, true, -1), 5); // clamped at the monthly minimum
assert.equal(stepHours(10, true, -1), 5);
assert.equal(stepHours(10, true, 1), 15);
assert.equal(stepHours(24, true, -1), 20); // off-step quantities land on a step
assert.equal(stepHours(24, true, 1), 25);
assert.equal(stepHours(100, true, 1), 100);

// Switching plan. The monthly minimum is the plan's rule, not a choice, so it
// must not follow the visitor back to the one-time plan.
assert.equal(hoursOnPlanSwitch(1, 1, true), 5); // one-time 1 -> monthly floor
assert.equal(hoursOnPlanSwitch(5, 1, false), 1); // ...and back to the 1 chosen
assert.equal(hoursOnPlanSwitch(40, 40, false), 40); // a real choice is kept
assert.equal(hoursOnPlanSwitch(12, 40, true), 10); // monthly snaps to its step

// Money in cents.
assert.equal(multiplyMoney({amount: '49.99'}, 15).amount, '749.85');
assert.equal(multiplyMoney({amount: '100.00'}, 10).amount, '1000.00');
assert.equal(subtractMoney({amount: '100.00'}, {amount: '50.00'}).amount, '50.00');

console.log('bulk hours rules: ok');
