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
