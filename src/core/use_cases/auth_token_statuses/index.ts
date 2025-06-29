import { PrismaClient } from "@prisma/client";

import { AuthTokenStatusEntity } from "../../entities/users/auth_token_statuses.entity";
import { JwtDecodedPayload } from "../../entities/users/jwt_user.entity";
import { StandardUserEntity } from "../../entities/users/standard_user.entity";
import { AuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses/auth_token_statuses_repository.interface";
import { TokenRepository } from "../../repositories/authentication/token/token_repository.interface";

export const generateAndSaveAuthTokenStatusUseCase = async (
  tokenRepository: TokenRepository,
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  user: StandardUserEntity,
): Promise<string> => {
  const tokenEncodedResponse = await tokenRepository.encoded(user);
  const { payload, token } = tokenEncodedResponse;
  const authTokenStatus = new AuthTokenStatusEntity(user.getId(), BigInt(payload?.iat ?? 0), BigInt(payload?.exp ?? 0));
  await authTokenStatusRepository.create(client, authTokenStatus);
  return token;
};

export const disabledAuthTokenStatusUseCase = async (
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  clientId: string,
  jwtDecoded: JwtDecodedPayload,
): Promise<boolean> => {
  const authTokenStatus = await authTokenStatusRepository.findOne(client, {
    clientId,
    userId: jwtDecoded.user.id,
    issuedAt: jwtDecoded.iat,
  });
  if (!authTokenStatus) {
    return false;
  }
  await authTokenStatusRepository.logOut(client, authTokenStatus.getId());
  return true;
};
