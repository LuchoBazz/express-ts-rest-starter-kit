import { NextFunction, Request, Response } from "express";
import { Result, ValidationChain, ValidationError, validationResult } from "express-validator";

import { ErrorMessage } from "../../../../src/adapters/api/errors/errors.enum";
import { UnprocessableEntityError } from "../../../../src/adapters/api/errors/unprocessable_entity.error";
import { validateSchema } from "../../../../src/adapters/api/validator";

jest.mock("express-validator");

describe("given a express-validator library with a validate function", () => {
  const req: Request = {} as Request;
  const res: Response = {} as Response;
  const next: NextFunction = jest.fn();

  afterEach(() => {
    jest.mocked(validationResult).mockClear();
  });

  describe("given a validation result mock with an empty value", () => {
    const validationResultMock: Result<ValidationError> = {
      isEmpty: () => {
        return true;
      },
    } as any;

    beforeEach(() => {
      jest.mocked(validationResult).mockReturnValue(validationResultMock);
    });

    it("should call next function when there are no validation errors", async () => {
      const validations: ValidationChain[] = [];

      await validateSchema(validations)(req, res, next);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("given a validation result mock with a value not empty", () => {
    const validationErrors = [{ msg: "Validation error message" }];
    const validationResultMock: Result<ValidationError> = {
      isEmpty: () => {
        return false;
      },
      array: () => {
        return validationErrors;
      },
    } as any;

    beforeEach(() => {
      jest.mocked(validationResult).mockReturnValue(validationResultMock);
    });

    it("should call next function with error when there are validation errors", async () => {
      const validations: ValidationChain[] = [];
      await validateSchema(validations)(req, res, next);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(next).toHaveBeenCalledWith(
        new UnprocessableEntityError(ErrorMessage.UNABLE_TO_PROCESS_ENTITY, validationErrors),
      );
    });
  });

  it("should call validation run method for each validation", async () => {
    const mockRun = jest.fn();
    const validations: ValidationChain[] = [{ run: mockRun }, { run: mockRun }] as any[];

    await validateSchema(validations)(req, res, next);

    expect(mockRun).toHaveBeenCalledTimes(2);
  });
});
