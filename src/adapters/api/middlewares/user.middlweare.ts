import { NextFunction, Request, Response } from "express";

import { AuthProvider, AuthType, CommonUserEntity } from "../../../core/entities/users/common_user.entity";
import { getTokenRepository } from "../../../core/repositories/authentication/token";
import { GuestUserEntity } from "../../../core/entities/users/guest_user.entity";

export const addUserToRequestMiddleware = async (request: Request, _response: Response, next: NextFunction) => {
  const authorization = (request.headers.Authorization ?? "").toString();
  const token = authorization.replace("Bearer ", "");
  const tokenRepository = getTokenRepository();
  const tokenDecoded = await tokenRepository.decode("", token);

  const { clientId, jwtDecoded } = tokenDecoded;

  if(!jwtDecoded) {
    request.user = new GuestUserEntity(clientId);
    return next();
  }

  const userDecoded = jwtDecoded.user;

  // TODO: Replace placeholder values with actual user information extracted from the token
  request.user = authorization
    ? new CommonUserEntity(
        userDecoded.username,
        userDecoded.first_name,
        userDecoded.last_name,
        userDecoded.email,
        null,
        null,
        true,
        true,
        true,
        "",
        userDecoded.auth_provider as AuthProvider,
        userDecoded.auth_type as AuthType,
        clientId,
      )
    : undefined;

  next();
};
