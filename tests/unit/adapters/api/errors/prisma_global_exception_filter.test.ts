import { Prisma } from "@prisma/client";

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../src/adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../src/adapters/api/errors/prisma_global_exception_filter";
import { ServerError } from "../../../../../src/adapters/api/errors/server.error";
import { UnauthorizedError } from "../../../../../src/adapters/api/errors/unauthorized.error";

describe("prismaGlobalExceptionFilter", () => {
  it.each([
    ["UNKNOWN_CODE", new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR)],
    ["P1234", new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR)],
    ["P2000", new InternalServerError(ErrorMessage.DATA_VALIDATION_FAILED)],
    ["P2002", new InternalServerError(ErrorMessage.COULD_NOT_BE_CREATED_BECAUSE_ID_ALREADY_EXISTS)],
    ["P2003", new InternalServerError(ErrorMessage.FOREIGN_KEY_CONSTRAINT_FAILED)],
    ["P2025", new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION)],
  ])("should throw expectedError for Prisma error code errorCode", (errorCode: string, expectedError: ServerError) => {
    const prismaError = new Prisma.PrismaClientKnownRequestError("UNKNOWN_ERROR", {
      code: errorCode,
      clientVersion: "5",
    });
    expect(() => {
      return prismaGlobalExceptionFilter(prismaError);
    }).toThrow(expectedError);
  });

  it("should throw the corresponding overwritten error for a mapped Prisma error code with an overwrite mapping", () => {
    const errorCode = "P2000";
    const overwriteMapping: Record<string, ServerError> = { [errorCode]: new InternalServerError("Overwritten Error") };
    const overwrittenError = overwriteMapping[errorCode];
    const prismaError = new Prisma.PrismaClientKnownRequestError("UNKNOWN_ERROR", {
      code: errorCode,
      clientVersion: "5",
    });
    expect(() => {
      return prismaGlobalExceptionFilter(prismaError, overwriteMapping);
    }).toThrow(overwrittenError);
  });
});
