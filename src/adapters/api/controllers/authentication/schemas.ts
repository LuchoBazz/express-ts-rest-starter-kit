import { checkSchema } from "express-validator";

export const signInSchema = checkSchema({
  access_token: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing access_token.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "access_token cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "access_token must be a string.",
    },
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: {
      errorMessage: "Invalid email format.",
    },
  },
});

export const signUpSchema = checkSchema({
  access_token: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing access_token.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "access_token cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "access_token must be a string.",
    },
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: {
      errorMessage: "Invalid email format.",
    },
  },
  username: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing username.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "username cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "username must be a string.",
    },
  },
  first_name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing first_name.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "first_name cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "first_name must be a string.",
    },
  },
  last_name: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing last_name.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "last_name cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "last_name must be a string.",
    },
  },
  identification_number: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "identification_number must be a string.",
    },
  },
  phone_number: {
    in: ["body"],
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: "phone_number must be a string.",
    },
  },
  terms: {
    in: ["body"],
    isBoolean: {
      errorMessage: "terms must be a boolean.",
    },
    toBoolean: true,
    errorMessage: "Missing terms agreement.",
  },
  notifications: {
    in: ["body"],
    isBoolean: {
      errorMessage: "notifications must be a boolean.",
    },
    toBoolean: true,
    optional: true,
  },
});

export const deleteAuthUserSchema = checkSchema({
  auth_id: {
    in: ["params"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing auth_id.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "auth_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "auth_id must be a string.",
    },
  },
});

export const userLogguedInSchema = checkSchema({
  Authorization: {
    in: ["headers"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing Authorization.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "Authorization cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "Authorization must be a string.",
    },
  },
});

export const refreshAuthTokenSchema = checkSchema({
  refresh_token: {
    in: ["body"],
    isEmpty: {
      options: { ignore_whitespace: true },
      negated: true,
      errorMessage: "Missing refresh_token.",
    },
    exists: {
      options: {
        checkFalsy: true,
      },
      errorMessage: "refresh_token cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "refresh_token must be a string.",
    },
  },
});
