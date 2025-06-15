import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { AuthProvider, AuthType, CommonUserEntity, UserPrisma } from "../../entities/users/common_user.entity";
import { JwtUserPayload } from "../../entities/users/jwt_user.entity";
import { UserRole } from "../../entities/users/role.enum";
import { ConfigManager } from "../../libs/config_manager";
import { getAuthRepository } from "../../repositories/authentication/auth";
import { getUserRepository } from "../../repositories/users/users";
import { AuthUser } from "../../types/authentication/base.types";
import { SignUpUser } from "../../types/authentication/user.type";

// TODO: Add tests
export const signInInteractor = async (
  clientId: string,
  accessToken: string,
  email: string,
): Promise<CommonUserEntity> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const response = await onSession(async (client: PrismaClient) => {
    const user = await authRepository.validateToken({ clientId, accessToken, email });
    if (!user || (user.email && user.email !== email)) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }
    const userRepository = getUserRepository();
    const commonUser = await userRepository.findOne(client, clientId, email);
    if (!commonUser) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    return commonUser;
  });
  return response;
};

export const signUpInteractor = async (
  clientId: string,
  accessToken: string,
  data: SignUpUser,
): Promise<CommonUserEntity> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const response = await onSession(async (client: PrismaClient) => {
    const user = await authRepository.validateToken({ clientId, accessToken, email: data.email });
    if (!user) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }

    const record = client.user.create({
      data: {
        user_username: data.username,
        user_first_name: data.firstName,
        user_last_name: data.lastName,
        user_email: data.email,
        user_identification_number: data.username,
        user_phone_number: data.username,
        user_terms: data.terms,
        user_notifications: data.notifications,
        user_is_active: true,
        user_uid: user.authId,
        user_role: UserRole.COMMON_USER,
        user_auth_provider: AuthProvider.FIREBASE,
        user_auth_type: AuthType.EMAIL_AND_PASSWORD,
        user_organization_client_id: clientId,
      },
    });

    const [recordCreated] = await client.$transaction([record]);
    return CommonUserEntity.fromPrisma(recordCreated as UserPrisma);
  });
  return response;
};

export const validateAuthTokenInteractor = async (
  clientId: string,
  accessToken: string,
  email?: string,
): Promise<AuthUser> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const user = await authRepository.validateToken({ clientId, accessToken, email });

  if (!user) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }

  return user;
};

export const userLoggedInInteractor = async (clientId: string, token: string): Promise<JwtUserPayload> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const user = await authRepository.userLoggedIn({ clientId, token });
  return user;
};

export const deleteAuthUserInteractor = async (clientId: string, authId: string): Promise<boolean> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const isDeleted = await authRepository.deleteUser({ clientId, authId });
  return isDeleted;
};
