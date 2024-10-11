"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaGlobalExceptionFilter = exports.errorMappings = void 0;
const client_1 = require("@prisma/client");
const errors_enum_1 = require("./errors.enum");
const internal_server_error_1 = require("./internal_server.error");
const server_error_1 = require("./server.error");
const unauthorized_error_1 = require("./unauthorized.error");
exports.errorMappings = {
    P2000: new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.DATA_VALIDATION_FAILED),
    P2002: new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.COULD_NOT_BE_CREATED_BECAUSE_ID_ALREADY_EXISTS),
    P2003: new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.FOREIGN_KEY_CONSTRAINT_FAILED),
    P2025: new unauthorized_error_1.UnauthorizedError(errors_enum_1.ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION),
};
const prismaGlobalExceptionFilter = (error, overwrite = {}) => {
    const errorMappingsOverWrite = {
        ...exports.errorMappings,
        ...overwrite,
    };
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && exports.errorMappings[error.code]) {
        const mappedError = errorMappingsOverWrite[error.code];
        throw mappedError;
    }
    throw new server_error_1.ServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
};
exports.prismaGlobalExceptionFilter = prismaGlobalExceptionFilter;
