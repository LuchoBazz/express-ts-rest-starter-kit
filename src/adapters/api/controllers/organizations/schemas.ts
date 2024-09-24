import { ConfigurationTypeEnum } from "@prisma/client";
import { checkSchema } from "express-validator";

export const organizationSchema = checkSchema({
  client_id: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing client_id.",
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

// FEATURE FLAGS

export const featureFlagKeyParamsSchema = checkSchema({
  key: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key.",
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
});

export const createFeatureFlagSchema = checkSchema({
  key: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key.",
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

export const updateFeatureFlagSchema = checkSchema({
  percentage: {
    in: ["body"],
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
      errorMessage: "is_experimental can not be null.",
      bail: true,
    },
    isBoolean: {
      errorMessage: "is_experimental is not a boolean.",
    },
  },
  is_active: {
    in: ["body"],
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      errorMessage: "is_active can not be null.",
      bail: true,
    },
    isBoolean: {
      errorMessage: "is_experimental is not a boolean.",
    },
  },
});

// CONFIGURATIONS

export const configurationKeyParamsSchema = checkSchema({
  key: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key.",
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
});

export const createConfigurationSchema = checkSchema({
  key: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key.",
    },
    optional: {
      options: {
        nullable: false,
      },
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
  value: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing value.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "value can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "value is not a string.",
    },
  },
  type: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing type.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "type can not be null.",
      bail: true,
    },
    isIn: {
      options: [Object.keys(ConfigurationTypeEnum)],
      errorMessage: "Not an valid type.",
    },
  },
});

export const updateConfigurationSchema = checkSchema({
  key: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing key.",
    },
    optional: {
      options: {
        nullable: false,
      },
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
  value: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing value.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "value can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "value is not a string.",
    },
  },
  type: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing type.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "type can not be null.",
      bail: true,
    },
    isIn: {
      options: [Object.keys(ConfigurationTypeEnum)],
      errorMessage: "Not an valid type.",
    },
  },
});

// ORGANIZATION

export const createOrganizationSchema = checkSchema({
  name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing name.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "name can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "name is not a string.",
    },
  },
});

export const updateOrganizationSchema = checkSchema({
  name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing name.",
    },
    optional: {
      options: {
        nullable: false,
      },
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "name can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "name is not a string.",
    },
  },
});
