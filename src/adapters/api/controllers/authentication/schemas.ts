import { checkSchema } from "express-validator";

export const signInSchema = checkSchema({
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
      errorMessage: "client_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "client_id must be a string.",
    },
  },
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
      errorMessage: "client_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "client_id must be a string.",
    },
  },
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
    optional: true,
    isString: {
      errorMessage: "identification_number must be a string.",
    },
  },
  phone_number: {
    in: ["body"],
    optional: true,
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
      errorMessage: "client_id cannot be null.",
      bail: true,
    },
    isString: {
      errorMessage: "client_id must be a string.",
    },
  },
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
