import { checkSchema } from "express-validator";

export const organizationSchema = checkSchema({
  client_id: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing client_id",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "client_id can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "client_id is not a string.",
    },
  },
});

export const createFeatureFlagSchema = checkSchema({
  key: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "key can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "key is not a string.",
    },
  },
  percentage: {
    in: ["body"],
    exists: true,
    isInt: {
      errorMessage: "percentage is not a integer.",
    },
    toInt: true,
  },
  is_experimental: {
    in: ["body"],
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "is_experimental can not be null.",
      bail: true,
    },
    isBoolean: {
      errorMessage: "is_experimental is not a boolean.",
    },
  },
});
