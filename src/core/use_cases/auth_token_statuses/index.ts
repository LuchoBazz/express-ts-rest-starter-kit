import { PrismaClient } from "@prisma/client";
import moment from "moment";

import { StandardUserEntity } from "../../entities/users/a_standard_user.entity";
import { AuthTokenStatusEntity } from "../../entities/users/auth_token_statuses.entity";
import { JwtDecodedPayload } from "../../entities/users/jwt_user.entity";
import { AuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses/auth_token_statuses_repository.interface";
import { TokenRepository } from "../../repositories/authentication/token/token_repository.interface";
import { RequestNetworkMetadata } from "../../types/authentication/request_network_metadata.types";

export const generateAndSaveAuthTokenStatusUseCase = async (
  tokenRepository: TokenRepository,
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  user: StandardUserEntity,
  requestMetadata: RequestNetworkMetadata,
): Promise<string> => {
  const iatDate = moment();
  const issuedAt = iatDate.unix();
  const expirationTime = iatDate.add(7, "days").unix();
  const authTokenStatus = new AuthTokenStatusEntity(
    user.getEmail(),
    user.getClientId(),
    new Date(issuedAt * 1000),
    new Date(expirationTime * 1000),
    requestMetadata.ipAddress,
    requestMetadata.userAgent,
  );
  const ats = await authTokenStatusRepository.create(client, authTokenStatus);
  const tokenEncodedResponse = await tokenRepository.encoded(user, issuedAt, expirationTime, ats.getId());
  const { token } = tokenEncodedResponse;
  return token;
};

export const disabledAuthTokenStatusUseCase = async (
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  clientId: string,
  jwtDecoded: JwtDecodedPayload,
): Promise<boolean> => {
  const ats = await authTokenStatusRepository.revokeBySession(client, {
    clientId,
    email: jwtDecoded.user.email,
    issuedAt: new Date(jwtDecoded.iat * 1000),
  });
  return ats.isRevoked();
};
