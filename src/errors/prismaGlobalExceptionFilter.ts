import { Prisma } from "@prisma/client";

import { ErrorMessage } from "./errors.enum";
import { ServerError } from "./server.error";
import { UnauthorizedError } from "./unauthorized.error";

export const errorMappings: Record<string, ServerError> = {
  P2000: new ServerError(ErrorMessage.DATA_VALIDATION_FAILED),
  P2002: new ServerError(ErrorMessage.COULD_NOT_BE_CREATED_BECAUSE_ID_ALREADY_EXISTS),
  P2003: new ServerError(ErrorMessage.FOREIGN_KEY_CONSTRAINT_FAILED),
  P2025: new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION),
};

export const prismaGlobalExceptionFilter = (error: any, overwrite: Record<string, ServerError> = {}): never => {
  const errorMappingsOverWrite: Record<string, ServerError> = {
    ...errorMappings,
    ...overwrite,
  };
  if (error instanceof Prisma.PrismaClientKnownRequestError && errorMappings[error.code]) {
    const mappedError = errorMappingsOverWrite[error.code];
    throw mappedError;
  }
  throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
};
