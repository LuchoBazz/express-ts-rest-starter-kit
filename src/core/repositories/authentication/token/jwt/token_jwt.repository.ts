import jwt from "jsonwebtoken";

import { StandardUserEntity } from "../../../../entities/users/a_standard_user.entity";
import { JwtAuthPayload, JwtDecodedPayload, JwtUserPayload } from "../../../../entities/users/jwt_user.entity";
import { decrypt, encrypt } from "../../../../libs/crypto";
import { UserLoggedInPayload } from "../../../../types/authentication/base.types";
import { TokenEncodedResponse } from "../../../../types/authentication/token.types";
import { TokenRepository } from "../token_repository.interface";

const JWT_SECRET = process.env.TOKEN_JWT_SECRET_KEY ?? "TOKEN_JWT_SECRET_KEY";

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
  encoded(
    user: StandardUserEntity,
    issuedAt: number,
    expirationTime: number,
    authTokenStatusId: string,
  ): Promise<TokenEncodedResponse> {
    const payload: JwtDecodedPayload = {
      user: {
        id: user.getId(),
        auth_id: user.getUid(),
        auth_token_status_id: authTokenStatusId,
        email: user.getEmail(),
        username: user.getUsername(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        client_id: user.getClientId(),
        role: user.getRole(),
        auth_provider: user.getAuthProvider(),
        auth_type: user.getAuthType(),
      },
      iat: issuedAt,
      exp: expirationTime,
      sub: user.getId(),
      iss: "express-ts-rest-starter-kit", // TODO: Replace with the real name or identifier of your application or service
      aud: ["express-ts-rest-starter-kit"], // TODO: Replace with the actual audience(s) allowed to use this token (e.g. frontend app, mobile client)
    };

    const jwtAuthPayload: JwtAuthPayload = {
      serialized_user: encrypt(JSON.stringify(payload.user)),
      sub: payload.sub,
      iat: payload.iat,
      exp: payload.exp,
      iss: payload.iss,
      aud: payload.aud,
    };

    const options: jwt.SignOptions = { algorithm: "HS256" };
    const token = jwt.sign(jwtAuthPayload, JWT_SECRET, options);
    return Promise.resolve({ token, payload });
  },
};
