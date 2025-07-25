import { PrismaClient } from "@prisma/client";
import moment from "moment";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { StandardUserEntity } from "../../entities/users/a_standard_user.entity";
import { AuthTokenStatusEntity } from "../../entities/users/auth_token_statuses.entity";
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
  getAuthorizedTokenPayload,
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
        null,
        null,
        data.terms,
        data.notifications,
        true,
        authUser.authId,
        authProviderLabel,
        data.authType,
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
    const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, refreshToken);
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
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
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

export const logOutInteractor = async (clientId: string, token: string): Promise<boolean> => {
  const tokenRepository = getTokenRepository();
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  await onSession(async (client: PrismaClient) => {
    return authTokenStatusRepository.revokeBySession(client, {
      id: jwtDecoded.user.auth_token_status_id,
      clientId,
      email: jwtDecoded.user.email,
    });
  });
  return true;
};

export const revokeTokenByIdInteractor = async (clientId: string, id: string, token: string): Promise<boolean> => {
  const tokenRepository = getTokenRepository();
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  await onSession(async (client: PrismaClient) => {
    const ats = await authTokenStatusRepository.findOne(client, id);
    if (!ats) {
      throw new UnauthorizedError(ErrorMessage.AUTH_TOKEN_STATUSES_NOT_FOUND);
    }
    console.log(JSON.stringify({ ats, user: jwtDecoded.user }, undefined, 2));

    if (ats.getEmail() !== jwtDecoded.user.email || ats.getOrganizationClientId() !== clientId) {
      throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
    }

    return authTokenStatusRepository.revokeBySession(client, {
      id: ats.getId(),
      clientId,
      email: jwtDecoded.user.email,
    });
  });
  return true;
};

export const revokeAllTokensByUserInteractor = async (clientId: string, token: string): Promise<boolean> => {
  const tokenRepository = getTokenRepository();
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const count = await onSession(async (client: PrismaClient) => {
    return authTokenStatusRepository.revokeAllByUserId(client, clientId, jwtDecoded.user.email);
  });
  return count > 0;
};

export const revokeAllTokensExceptCurrentInteractor = async (clientId: string, token: string): Promise<boolean> => {
  const tokenRepository = getTokenRepository();
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const count = await onSession(async (client: PrismaClient) => {
    return authTokenStatusRepository.revokeAllExcept(client, {
      id: jwtDecoded.user.auth_token_status_id,
      clientId,
      email: jwtDecoded.user.email,
    });
  });
  return count > 0;
};

export const getActiveTokensInteractor = async (clientId: string, token: string): Promise<AuthTokenStatusEntity[]> => {
  const tokenRepository = getTokenRepository();
  const jwtDecoded = await getAuthorizedTokenPayload(tokenRepository, clientId, token);
  const authTokenStatusRepository = getAuthTokenStatusesRepository();
  const authTokenStatuses = await onSession(async (client: PrismaClient) => {
    return authTokenStatusRepository.find(client, {
      clientId,
      email: jwtDecoded.user.email,
    });
  });
  return authTokenStatuses.filter((ats) => ats.getId() !== jwtDecoded.user.auth_token_status_id);
};
