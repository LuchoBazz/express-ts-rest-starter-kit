import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

import { ErrorMessage } from "../../errors/errors.enum";
import { UnprocessableEntityError } from "../../errors/unprocessable_entity.error";

export const validateSchema = (validations: ValidationChain[]) => {
  return async (request: Request, _: Response, next: NextFunction) => {
    const validationPromises = validations.map((validation: ValidationChain) => {
      return validation.run(request);
    });

    await Promise.all(validationPromises);

    const errors = validationResult(request);

    if (errors.isEmpty()) {
      return next();
    }

    const error = new UnprocessableEntityError(ErrorMessage.UNABLE_TO_PROCESS_ENTITY, errors.array());
    return next(error);
  };
};
