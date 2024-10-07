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
