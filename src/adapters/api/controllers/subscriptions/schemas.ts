import { checkSchema } from "express-validator";

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
