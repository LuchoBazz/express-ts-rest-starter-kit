"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const errors_enum_1 = require("../../../../../src/adapters/api/errors/errors.enum");
const unprocessable_entity_error_1 = require("../../../../../src/adapters/api/errors/unprocessable_entity.error");
const validator_1 = require("../../../../../src/adapters/api/validator");
jest.mock("express-validator");
describe("given a express-validator library with a validate function", () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    afterEach(() => {
        jest.mocked(express_validator_1.validationResult).mockClear();
    });
    describe("given a validation result mock with an empty value", () => {
        const validationResultMock = {
            isEmpty: () => {
                return true;
            },
        };
        beforeEach(() => {
            jest.mocked(express_validator_1.validationResult).mockReturnValue(validationResultMock);
        });
        it("should call next function when there are no validation errors", async () => {
            const validations = [];
            await (0, validator_1.validateSchema)(validations)(req, res, next);
            expect(express_validator_1.validationResult).toHaveBeenCalledWith(req);
            expect(next).toHaveBeenCalled();
        });
    });
    describe("given a validation result mock with a value not empty", () => {
        const validationErrors = [{ msg: "Validation error message" }];
        const validationResultMock = {
            isEmpty: () => {
                return false;
            },
            array: () => {
                return validationErrors;
            },
        };
        beforeEach(() => {
            jest.mocked(express_validator_1.validationResult).mockReturnValue(validationResultMock);
        });
        it("should call next function with error when there are validation errors", async () => {
            const validations = [];
            await (0, validator_1.validateSchema)(validations)(req, res, next);
            expect(express_validator_1.validationResult).toHaveBeenCalledWith(req);
            expect(next).toHaveBeenCalledWith(new unprocessable_entity_error_1.UnprocessableEntityError(errors_enum_1.ErrorMessage.UNABLE_TO_PROCESS_ENTITY, validationErrors));
        });
    });
    it("should call validation run method for each validation", async () => {
        const mockRun = jest.fn();
        const validations = [{ run: mockRun }, { run: mockRun }];
        await (0, validator_1.validateSchema)(validations)(req, res, next);
        expect(mockRun).toHaveBeenCalledTimes(2);
    });
});
