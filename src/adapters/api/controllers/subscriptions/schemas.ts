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
  userId: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing user ID.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "user ID cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "user ID is not a string.",
    },
  },
  subscriptionPlanId: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing subscription plan ID.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "subscription plan ID cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "subscription plan ID is not a string.",
    },
  },
  externalSubscriptionId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "external subscription ID is not a string.",
    },
  },
  billingCycle: {
    in: ["body"],
    isString: {
      errorMessage: "billing cycle is not a string.",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "status is not a string.",
    },
  },
  isActive: {
    in: ["body"],
    isBoolean: {
      errorMessage: "isActive is not a boolean.",
    },
  },
  renewsAt: {
    in: ["body"],
    isISO8601: {
      errorMessage: "renewsAt is not a valid date.",
    },
    toDate: true,
  },
  startsAt: {
    in: ["body"],
    isISO8601: {
      errorMessage: "startsAt is not a valid date.",
    },
    toDate: true,
  },
  endsAt: {
    in: ["body"],
    isISO8601: {
      errorMessage: "endsAt is not a valid date.",
    },
    toDate: true,
  },
});

export const updateSubscriptionSchema = checkSchema({
  userId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "user ID is not a string.",
    },
  },
  subscriptionPlanId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "subscription plan ID is not a string.",
    },
  },
  externalSubscriptionId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "external subscription ID is not a string.",
    },
  },
  billingCycle: {
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
  isActive: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "isActive is not a boolean.",
    },
  },
  renewsAt: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "renewsAt is not a valid date.",
    },
    toDate: true,
  },
  startsAt: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "startsAt is not a valid date.",
    },
    toDate: true,
  },
  endsAt: {
    in: ["body"],
    optional: true,
    isISO8601: {
      errorMessage: "endsAt is not a valid date.",
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
  productId: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing productId.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "productId cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "productId is not a string.",
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
  billingCycle: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing billingCycle.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "billingCycle cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "billingCycle is not a string.",
    },
  },
  nodeQuota: {
    in: ["body"],
    isInt: {
      errorMessage: "nodeQuota is not a valid integer.",
    },
    toInt: true,
  },
  mostPopular: {
    in: ["body"],
    isBoolean: {
      errorMessage: "mostPopular is not a boolean.",
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
  billingCycle: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "billingCycle is not a string.",
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
  nodeQuota: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isInt: {
      errorMessage: "nodeQuota is not a valid integer.",
    },
    toInt: true,
  },
  mostPopular: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isBoolean: {
      errorMessage: "mostPopular is not a boolean.",
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
  isActive: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isBoolean: {
      errorMessage: "isActive is not a boolean.",
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
  subscriptionId: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing subscriptionId.",
    },
    isString: {
      errorMessage: "subscriptionId is not a string.",
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
  externalPaymentId: {
    in: ["body"],
    isString: {
      errorMessage: "externalPaymentId is not a string.",
    },
  },
  status: {
    in: ["body"],
    isString: {
      errorMessage: "status is not a string.",
    },
  },
  organizationClientId: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing organizationClientId.",
    },
    isString: {
      errorMessage: "organizationClientId is not a string.",
    },
  },
});

export const updatePaymentSchema = checkSchema({
  subscriptionId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "subscriptionId is not a string.",
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
  externalPaymentId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "externalPaymentId is not a string.",
    },
  },
  status: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "status is not a string.",
    },
  },
  organizationClientId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "organizationClientId is not a string.",
    },
  },
});
