import jwt from "jsonwebtoken";

import { JwtAuthPayload, JwtDecodedPayload, JwtUserPayload } from "../../../../entities/users/jwt_user.entity";
import { decrypt } from "../../../../libs/crypto";
import { UserLoggedInPayload } from "../../../../types/authentication/base.types";
import { TokenRepository } from "../token_repository.interface";

const JWT_SECRET = "YOUR_JWT_TOKEN_HERE"; // TODO: Move to environment variables for security

export const JwtTokenRepository: TokenRepository = {
  decode(clientId: string, token: string): Promise<UserLoggedInPayload> {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtAuthPayload | null;
    const invalidTokenResponse = { clientId, jwtDecoded: null };
    if (!decoded?.serialized_user) {
      return Promise.resolve(invalidTokenResponse);
    }
    const deserializedUser = decrypt(decoded.serialized_user);
    const user = JSON.parse(deserializedUser) as JwtUserPayload;

    const jwtDecoded: JwtDecodedPayload = { ...decoded, user };

    if (user.client_id !== clientId) {
      return Promise.resolve(invalidTokenResponse);
    }
    return Promise.resolve({ clientId, jwtDecoded });
  },
};
