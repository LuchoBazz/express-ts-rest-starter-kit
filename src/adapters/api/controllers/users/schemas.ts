import { checkSchema } from "express-validator";

export const roleSchema = checkSchema({
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

export const permissionSchema = checkSchema({
  name: {
    in: ["params"],
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

export const permissionOnRoleSchema = checkSchema({
  role_name: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing role_name.",
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
      errorMessage: "role_name can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "role_name is not a string.",
    },
  },
});

export const addPermissionsToRoleSchema = checkSchema({
  role_name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing role_name.",
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
      errorMessage: "role_name can not be null.",
      bail: true,
    },
    isString: {
      errorMessage: "role_name is not a string.",
    },
  },
  permissions: {},
});

export const updateUserSchema = checkSchema({
  email: {
    in: ["body"],
    exists: {
      options: { checkFalsy: true },
      errorMessage: "email is required.",
    },
    isEmail: {
      errorMessage: "email is not valid.",
    },
    normalizeEmail: true,
  },
  username: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "username must be a string.",
    },
  },
  first_name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "first_name must be a string.",
    },
  },
  last_name: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "last_name must be a string.",
    },
  },
  identification_number: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "identification_number must be a string.",
    },
  },
  phone_number: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isString: {
      errorMessage: "phone_number must be a string.",
    },
  },
  terms: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "terms must be a boolean value.",
    },
    toBoolean: true,
  },
  notifications: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "notifications must be a boolean value.",
    },
    toBoolean: true,
  },
  is_active: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "is_active must be a boolean value.",
    },
    toBoolean: true,
  },
  uid: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "uid must be a string.",
    },
  },
  role: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "role must be a string.",
    },
  },
  auth_provider: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "auth_provider must be a string.",
    },
  },
  auth_type: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "auth_type must be a string.",
    },
  },
});
