import { PrismaClient } from "@prisma/client";
import moment from "moment";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { AuthTokenStatusEntity } from "../../entities/users/auth_token_statuses.entity";
import { AuthProvider, AuthType, CommonUserEntity, UserPrisma } from "../../entities/users/common_user.entity";
import { JwtUserPayload } from "../../entities/users/jwt_user.entity";
import { UserRole } from "../../entities/users/role.enum";
import { ConfigManager } from "../../libs/config_manager";
import { getAuthRepository } from "../../repositories/authentication/auth";
import { getAuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses";
import { getTokenRepository } from "../../repositories/authentication/token";
import { getUserRepository } from "../../repositories/users/users";
import { SignUpUser } from "../../types/authentication/user.type";

// TODO: Add tests
export const signInInteractor = async (clientId: string, accessToken: string, email: string): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();

  return onSession(async (client: PrismaClient) => {
    const user = await authRepository.validateToken({ clientId, accessToken, email });
    if (!user || (user.email && user.email !== email)) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }
    const userRepository = getUserRepository();
    const commonUser = await userRepository.findOne(client, clientId, email);
    if (!commonUser) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    // TODO: In the decode return the object and token to avoid these 2 asynchronous calls.
    const tokenEncoded = await tokenRepository.encoded(commonUser);
    const tokenDecoded = await tokenRepository.decode(clientId, tokenEncoded);
    const { jwtDecoded } = tokenDecoded;
    const authTokenStatus = new AuthTokenStatusEntity(
      commonUser.getId(),
      BigInt(jwtDecoded?.iat ?? 0),
      BigInt(jwtDecoded?.exp ?? 0),
    );
    await authTokenStatusRepository.create(client, authTokenStatus);
    return tokenEncoded;
  });
};

export const signUpInteractor = async (clientId: string, accessToken: string, data: SignUpUser): Promise<string> => {
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
  const tokenRepository = getTokenRepository();
  return tokenRepository.encoded(response);
};

export const userLoggedInInteractor = async (clientId: string, token: string): Promise<JwtUserPayload> => {
  const tokenRepository = getTokenRepository();
  const decodedUser = await tokenRepository.decode(clientId, token);
  const { jwtDecoded } = decodedUser;
  if (!jwtDecoded || clientId !== jwtDecoded.user.client_id) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const ats = await onSession(async (client: PrismaClient) => {
    return authTokenStatusRepository.findOne(client, {
      clientId,
      userId: jwtDecoded.user.id,
      issuedAt: jwtDecoded.iat,
    });
  });

  if (!ats || moment().isAfter(moment(Number(ats.getExpirationTime())))) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }

  return jwtDecoded.user;
};

export const deleteAuthUserInteractor = async (clientId: string, authId: string): Promise<boolean> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const isDeleted = await authRepository.deleteUser({ clientId, authId });
  return isDeleted;
};
