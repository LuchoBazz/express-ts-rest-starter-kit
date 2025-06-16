import jwt from "jsonwebtoken";
import moment from "moment";

import { CommonUserEntity } from "../../../../entities/users/common_user.entity";
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
  encoded(user: CommonUserEntity): Promise<string> {
    const iatDate = moment();
    const payload: JwtDecodedPayload = {
      user: {
        id: user.getId(),
        auth_id: user.getUid(),
        email: user.getEmail(),
        username: user.getUsername(),
        first_name: user.getFirstName(),
        last_name: user.getLastName(),
        client_id: user.getClientId(),
        role: user.getRole(),
        auth_provider: user.getAuthProvider(),
        auth_type: user.getAuthType(),
      },
      iat: iatDate.unix(),
      exp: iatDate.add(7, "days").unix(),
      sub: user.getId(),
      iss: "express-ts-rest-starter-kit", // TODO: Replace with the real name or identifier of your application or service
      aud: ["express-ts-rest-starter-kit"], // TODO: Replace with the actual audience(s) allowed to use this token (e.g. frontend app, mobile client)
    };

    const options: jwt.SignOptions = { algorithm: "HS256" };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return Promise.resolve(token);
  },
};
