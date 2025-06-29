import { PrismaClient } from "@prisma/client";
import moment from "moment";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { AuthType, StandardUserEntity } from "../../entities/users/a_standard_user.entity";
import { JwtUserPayload } from "../../entities/users/jwt_user.entity";
import { BaseUserEntity } from "../../entities/users/user_base.entity";
import { ConfigManager } from "../../libs/config_manager";
import { getAuthRepository } from "../../repositories/authentication/auth";
import { getAuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses";
import { getTokenRepository } from "../../repositories/authentication/token";
import { getUserRepository } from "../../repositories/users/users";
import { RequestNetworkMetadata } from "../../types/authentication/request_network_metadata.types";
import { SignUpUser } from "../../types/authentication/user.type";
import {
  disabledAuthTokenStatusUseCase,
  generateAndSaveAuthTokenStatusUseCase,
} from "../../use_cases/auth_token_statuses";

// TODO: Add tests
export const signInInteractor = async (
  clientId: string,
  accessToken: string,
  email: string,
  networkMetadata: RequestNetworkMetadata,
): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const authUser = await authRepository.validateToken({ clientId, accessToken, email });
    if (!authUser || (authUser.email && authUser.email !== email)) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }
    const user = await userRepository.findOne(client, clientId, email);
    if (!user) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    return generateAndSaveAuthTokenStatusUseCase(
      tokenRepository,
      authTokenStatusRepository,
      client,
      user,
      networkMetadata,
    );
  });
};

export const signUpInteractor = async (
  clientId: string,
  accessToken: string,
  data: SignUpUser,
  networkMetadata: RequestNetworkMetadata,
): Promise<string> => {
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const authUser = await authRepository.validateToken({ clientId, accessToken, email: data.email });
    if (!authUser) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }

    const user = await userRepository.create(
      client,
      new StandardUserEntity(
        data.username,
        data.firstName,
        data.lastName,
        data.email,
        data.identificationNumber,
        data.phoneNumber,
        data.terms,
        data.notifications,
        true,
        authUser.authId,
        authProviderLabel,
        AuthType.EMAIL_AND_PASSWORD,
        clientId,
      ),
    );
    return generateAndSaveAuthTokenStatusUseCase(
      tokenRepository,
      authTokenStatusRepository,
      client,
      user,
      networkMetadata,
    );
  });
};

export const refreshAuthTokenInteractor = async (
  clientId: string,
  refreshToken: string,
  networkMetadata: RequestNetworkMetadata,
): Promise<string> => {
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const tokenRepository = getTokenRepository();
  const userRepository = getUserRepository();

  return onSession(async (client: PrismaClient) => {
    const userLoggedIn = await tokenRepository.decode(clientId, refreshToken);
    const { jwtDecoded } = userLoggedIn;
    if (!jwtDecoded) {
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
    const user = await userRepository.findOne(client, clientId, jwtDecoded.user.email);
    if (!user) {
      throw new UnauthorizedError(ErrorMessage.USER_NOT_FOUND);
    }
    return generateAndSaveAuthTokenStatusUseCase(
      tokenRepository,
      authTokenStatusRepository,
      client,
      user,
      networkMetadata,
    );
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
    return authTokenStatusRepository.findOne(client, jwtDecoded.user.auth_token_status_id);
  });

  const expirationTime = ats?.getExpirationTime() ?? new Date();
  const isTokenExpired = moment().isAfter(moment(expirationTime));

  if (!ats || isTokenExpired) {
    throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
  }

  return jwtDecoded.user;
};

export const deleteAuthUserInteractor = async (
  clientId: string,
  user: BaseUserEntity,
  authId: string,
): Promise<boolean> => {
  // TODO: Add validation (authId and user.authId should be equals)
  const authProviderLabel = await ConfigManager.findAuthProvider(clientId);
  const authRepository = getAuthRepository(authProviderLabel);
  const userRepository = getUserRepository();

  const [first, second] = await Promise.all([
    onSession(async (client: PrismaClient) => {
      return userRepository.delete(client, { clientId, email: user.getEmail() });
    }),
    authRepository.deleteUser({ clientId, authId }),
  ]);
  return first && second;
};
