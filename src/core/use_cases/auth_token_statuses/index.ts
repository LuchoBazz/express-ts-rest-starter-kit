import { PrismaClient } from "@prisma/client";

import { AuthTokenStatusEntity } from "../../entities/users/auth_token_statuses.entity";
import { CommonUserEntity } from "../../entities/users/common_user.entity";
import { AuthTokenStatusesRepository } from "../../repositories/authentication/auth_token_statuses/auth_token_statuses_repository.interface";
import { TokenRepository } from "../../repositories/authentication/token/token_repository.interface";

export const generateAndSaveAuthTokenStatusUseCase = async (
  tokenRepository: TokenRepository,
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  user: CommonUserEntity,
): Promise<string> => {
  const tokenEncodedResponse = await tokenRepository.encoded(user);
  const { payload, token } = tokenEncodedResponse;
  const authTokenStatus = new AuthTokenStatusEntity(user.getId(), BigInt(payload?.iat ?? 0), BigInt(payload?.exp ?? 0));
  await authTokenStatusRepository.create(client, authTokenStatus);
  return token;
};
