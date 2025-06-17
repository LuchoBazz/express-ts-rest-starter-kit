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
  const clientId = user.getClientId();
  // TODO: In the decode return the object and token to avoid these 2 asynchronous calls.
  const tokenEncoded = await tokenRepository.encoded(user);
  const tokenDecoded = await tokenRepository.decode(clientId, tokenEncoded);
  const { jwtDecoded } = tokenDecoded;
  const authTokenStatus = new AuthTokenStatusEntity(
    user.getId(),
    BigInt(jwtDecoded?.iat ?? 0),
    BigInt(jwtDecoded?.exp ?? 0),
  );
  await authTokenStatusRepository.create(client, authTokenStatus);
  return tokenEncoded;
};
