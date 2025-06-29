import { PrismaClient } from "@prisma/client";
import moment from "moment";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { AuthType, CommonUserEntity } from "../../entities/users/common_user.entity";
import { JwtUserPayload } from "../../entities/users/jwt_user.entity";
import { ConfigManager } from "../../libs/config_manager";
import { getAuthRepository } from "../../repositories/authentication/auth";
import { getAuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses";
import { getTokenRepository } from "../../repositories/authentication/token";
import { getUserRepository } from "../../repositories/users/users";
import { SignUpUser } from "../../types/authentication/user.type";
import {
  disabledAuthTokenStatusUseCase,
  generateAndSaveAuthTokenStatusUseCase,
} from "../../use_cases/auth_token_statuses";

// TODO: Add tests
export const signInInteractor = async (clientId: string, accessToken: string, email: string): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const user = await authRepository.validateToken({ clientId, accessToken, email });
    if (!user || (user.email && user.email !== email)) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }
    const commonUser = await userRepository.findOne(client, clientId, email);
    if (!commonUser) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    return generateAndSaveAuthTokenStatusUseCase(tokenRepository, authTokenStatusRepository, client, commonUser);
  });
};

export const signUpInteractor = async (clientId: string, accessToken: string, data: SignUpUser): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const user = await authRepository.validateToken({ clientId, accessToken, email: data.email });
    if (!user) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }

    const commonUser = await userRepository.create(
      client,
      new CommonUserEntity(
        data.username,
        data.firstName,
        data.lastName,
        data.email,
        data.identificationNumber,
        data.phoneNumber,
        data.terms,
        data.notifications,
        true,
        user.authId,
        authProviderLabel,
        AuthType.EMAIL_AND_PASSWORD,
        clientId,
      ),
    );
    return generateAndSaveAuthTokenStatusUseCase(tokenRepository, authTokenStatusRepository, client, commonUser);
  });
};

export const refreshAuthTokenInteractor = async (clientId: string, refreshToken: string): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const [user, userLoggedIn] = await Promise.all([
      authRepository.validateToken({ clientId, accessToken: refreshToken }),
      tokenRepository.decode(clientId, refreshToken),
    ]);
    const { jwtDecoded } = userLoggedIn;
    if (!user || !jwtDecoded) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }
    const tokenInvalidated = await disabledAuthTokenStatusUseCase(
      authTokenStatusRepository,
      client,
      clientId,
      jwtDecoded,
    );
    if (!tokenInvalidated) {
      throw new UnauthorizedError(ErrorMessage.REFRESH_TOKEN_FAILED);
    }
    const commonUser = await userRepository.findOne(client, clientId, jwtDecoded.user.email);
    if (!commonUser) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    return generateAndSaveAuthTokenStatusUseCase(tokenRepository, authTokenStatusRepository, client, commonUser);
  });
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

  const expirationTime = Number(ats?.getExpirationTime() ?? 0);
  const isTokenExpired = moment().isAfter(moment(expirationTime));

  if (!ats || isTokenExpired) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }

  return jwtDecoded.user;
};

export const deleteAuthUserInteractor = async (clientId: string, authId: string): Promise<boolean> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  return authRepository.deleteUser({ clientId, authId });
};
