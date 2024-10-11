"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
const errors_enum_1 = require("../errors/errors.enum");
const unprocessable_entity_error_1 = require("../errors/unprocessable_entity.error");
const validateSchema = (validations) => {
    return async (request, _, next) => {
        const validationPromises = validations.map((validation) => {
            return validation.run(request);
        });
        await Promise.all(validationPromises);
        const errors = (0, express_validator_1.validationResult)(request);
        if (errors.isEmpty()) {
            return next();
        }
        const error = new unprocessable_entity_error_1.UnprocessableEntityError(errors_enum_1.ErrorMessage.UNABLE_TO_PROCESS_ENTITY, errors.array());
        return next(error);
    };
};
exports.validateSchema = validateSchema;
