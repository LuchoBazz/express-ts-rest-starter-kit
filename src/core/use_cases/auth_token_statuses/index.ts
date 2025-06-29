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
  const authTokenStatus = new AuthTokenStatusEntity(
    user.getEmail(),
    user.getClientId(),
    new Date((payload?.iat ?? 0) * 1000),
    new Date((payload?.exp ?? 0) * 1000),
    // TODO: Update with dynamic data
    "192.168.1.1",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  );
  await authTokenStatusRepository.create(client, authTokenStatus);
  return token;
};

export const disabledAuthTokenStatusUseCase = async (
  authTokenStatusRepository: AuthTokenStatusesRepository,
  client: PrismaClient,
  clientId: string,
  jwtDecoded: JwtDecodedPayload,
): Promise<boolean> => {
  const ats = await authTokenStatusRepository.logOut(client, {
    clientId,
    email: jwtDecoded.user.email,
    issuedAt: new Date(jwtDecoded.iat * 1000),
  });
  return ats.isRevoked();
};
