import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { AuthService } from "../../services/authentication/auth.service";
import { AuthUser } from "../../types/authentication/base.types";

export const validateAuthTokenInteractor = async (
  clientId: string,
  accessToken: string,
  email?: string,
): Promise<AuthUser> => {
  const user = await onSession(async (client: PrismaClient) => {
    return AuthService.getInstance().validateToken(client, { clientId, accessToken, email });
  });

  if (!user) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }

  return user;
};

export const deleteAuthUserInteractor = async (clientId: string, authId: string): Promise<boolean> => {
  const isDeleted = await onSession(async (client: PrismaClient) => {
    return AuthService.getInstance().deleteUser(client, { clientId, authId });
  });

  return isDeleted;
};
