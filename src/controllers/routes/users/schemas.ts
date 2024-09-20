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
