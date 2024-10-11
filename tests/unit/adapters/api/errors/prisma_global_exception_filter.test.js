"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const errors_enum_1 = require("../../../../../src/adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../../../src/adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../../../src/adapters/api/errors/prisma_global_exception_filter");
const unauthorized_error_1 = require("../../../../../src/adapters/api/errors/unauthorized.error");
describe("prismaGlobalExceptionFilter", () => {
    it.each([
        ["UNKNOWN_CODE", new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR)],
        ["P1234", new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR)],
        ["P2000", new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.DATA_VALIDATION_FAILED)],
        ["P2002", new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.COULD_NOT_BE_CREATED_BECAUSE_ID_ALREADY_EXISTS)],
        ["P2003", new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.FOREIGN_KEY_CONSTRAINT_FAILED)],
        ["P2025", new unauthorized_error_1.UnauthorizedError(errors_enum_1.ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION)],
    ])("should throw expectedError for Prisma error code errorCode", (errorCode, expectedError) => {
        const prismaError = new client_1.Prisma.PrismaClientKnownRequestError("UNKNOWN_ERROR", {
            code: errorCode,
            clientVersion: "5",
        });
        expect(() => {
            return (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(prismaError);
        }).toThrow(expectedError);
    });
    it("should throw the corresponding overwritten error for a mapped Prisma error code with an overwrite mapping", () => {
        const errorCode = "P2000";
        const overwriteMapping = { [errorCode]: new internal_server_error_1.InternalServerError("Overwritten Error") };
        const overwrittenError = overwriteMapping[errorCode];
        const prismaError = new client_1.Prisma.PrismaClientKnownRequestError("UNKNOWN_ERROR", {
            code: errorCode,
            clientVersion: "5",
        });
        expect(() => {
            return (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(prismaError, overwriteMapping);
        }).toThrow(overwrittenError);
    });
});
