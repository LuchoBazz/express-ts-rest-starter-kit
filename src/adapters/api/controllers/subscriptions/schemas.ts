import { checkSchema } from "express-validator";

// SUBSCRIPTIONS

export const subscriptionKeyParamsSchema = checkSchema({
  id: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing subscription ID.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "subscription ID cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "subscription ID is not a string.",
    },
  },
});

export const createSubscriptionSchema = checkSchema({
  user_id: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing user_id.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "user_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "user_id is not a string.",
    },
  },
  subscription_plan_id: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing subscription_plan_id.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "subscription_plan_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "subscription_plan_id is not a string.",
    },
  },
  external_subscription_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "external_subscription_id is not a string.",
    },
  },
  billing_cycle: {
    in: ["body"],
    isString: {
      errorMessage: "billing_cycle is not a string.",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "status is not a string.",
    },
  },
  is_active: {
    in: ["body"],
    isBoolean: {
      errorMessage: "is_active is not a boolean.",
    },
  },
  renews_at: {
    in: ["body"],
    isISO8601: {
      errorMessage: "renews_at is not a valid date.",
    },
    toDate: true,
  },
  starts_at: {
    in: ["body"],
    isISO8601: {
      errorMessage: "starts_at is not a valid date.",
    },
    toDate: true,
  },
  ends_at: {
    in: ["body"],
    isISO8601: {
      errorMessage: "ends_at is not a valid date.",
    },
    toDate: true,
  },
});

export const updateSubscriptionSchema = checkSchema({
  user_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "user ID is not a string.",
    },
  },
  subscription_plan_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "subscription plan ID is not a string.",
    },
  },
  external_subscription_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "external subscription ID is not a string.",
    },
  },
  billing_cycle: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "billing cycle is not a string.",
    },
  },
  status: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "status is not a string.",
    },
  },
  is_active: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "is_active is not a boolean.",
    },
  },
  renews_at: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "renews_at is not a valid date.",
    },
    toDate: true,
  },
  starts_at: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "starts_at is not a valid date.",
    },
    toDate: true,
  },
  ends_at: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "ends_at is not a valid date.",
    },
    toDate: true,
  },
});

// SUBSCRIPTION PLAN

export const subscriptionPlanKeyParamsSchema = checkSchema({
  slug: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing slug.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "slug cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "slug is not a string.",
    },
  },
});

export const createSubscriptionPlanSchema = checkSchema({
  name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing name.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "name cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "name is not a string.",
    },
  },
  product_id: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing product_id.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "product_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "product_id is not a string.",
    },
  },
  variants: {
    in: ["body"],
    isArray: {
      errorMessage: "variants should be an array.",
    },
  },
  price: {
    in: ["body"],
    isFloat: {
      errorMessage: "price is not a valid number.",
    },
    toFloat: true,
  },
  billing_cycle: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing billing_cycle.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "billing_cycle cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "billing_cycle is not a string.",
    },
  },
  node_quota: {
    in: ["body"],
    isInt: {
      errorMessage: "node_quota is not a valid integer.",
    },
    toInt: true,
  },
  most_popular: {
    in: ["body"],
    isBoolean: {
      errorMessage: "most_popular is not a boolean.",
    },
  },
  tier: {
    in: ["body"],
    isInt: {
      errorMessage: "tier is not a valid integer.",
    },
    toInt: true,
  },
});

export const updateSubscriptionPlanSchema = checkSchema({
  price: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isFloat: {
      errorMessage: "price is not a valid number.",
    },
    toFloat: true,
  },
  billing_cycle: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "billing_cycle is not a string.",
    },
  },
  description: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "description is not a string.",
    },
  },
  node_quota: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isInt: {
      errorMessage: "node_quota is not a valid integer.",
    },
    toInt: true,
  },
  most_popular: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isBoolean: {
      errorMessage: "most_popular is not a boolean.",
    },
  },
  tier: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isInt: {
      errorMessage: "tier is not a valid integer.",
    },
    toInt: true,
  },
  is_active: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isBoolean: {
      errorMessage: "is_active is not a boolean.",
    },
  },
});

// PAYMENT
export const paymentKeyParamsSchema = checkSchema({
  payment_id: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing payment_id.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "payment_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "payment_id is not a string.",
    },
  },
});

export const createPaymentSchema = checkSchema({
  subscription_id: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing subscription_id.",
    },
    isString: {
      errorMessage: "subscription_id is not a string.",
    },
  },
  amount: {
    in: ["body"],
    isFloat: {
      errorMessage: "amount is not a valid number.",
    },
    toFloat: true,
  },
  currency: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing currency.",
    },
    isString: {
      errorMessage: "currency is not a string.",
    },
  },
  external_payment_id: {
    in: ["body"],
    isString: {
      errorMessage: "external_payment_id is not a string.",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "status is not a string.",
    },
  },
});

export const updatePaymentSchema = checkSchema({
  subscription_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "subscription_id is not a string.",
    },
  },
  amount: {
    in: ["body"],
    optional: true,
    isFloat: {
      errorMessage: "amount is not a valid number.",
    },
    toFloat: true,
  },
  currency: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "currency is not a string.",
    },
  },
  external_payment_id: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "external_payment_id is not a string.",
    },
  },
  status: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "status is not a string.",
    },
  },
});
