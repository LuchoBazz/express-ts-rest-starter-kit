import { NextFunction, Request, Response } from "express";

import { AuthProvider, AuthType, CommonUserEntity } from "../../../core/entities/users/common_user.entity";
import { GuestUserEntity } from "../../../core/entities/users/guest_user.entity";
import { getTokenRepository } from "../../../core/repositories/authentication/token";
import { getClientIdFromHeaders } from "../../../core/shared/utils/router.util";

export const addUserToRequestMiddleware = async (request: Request, _response: Response, next: NextFunction) => {
  try {
    const authorization = (request.headers.Authorization ?? "").toString();
    const token = authorization.replace("Bearer ", "");
    const clientId = getClientIdFromHeaders(request.headers);
    const tokenRepository = getTokenRepository();
    console.log({ clientId, token });

    if (!token || !clientId) {
      request.user = new GuestUserEntity(clientId);
      return next();
    }

    const tokenDecoded = await tokenRepository.decode(clientId, token);
    const { jwtDecoded } = tokenDecoded;

    if (!jwtDecoded) {
      request.user = new GuestUserEntity(clientId);
      return next();
    }

    const userDecoded = jwtDecoded.user;

    // TODO: Replace placeholder values with actual user information extracted from the token
    request.user = new CommonUserEntity(
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
    );
  } catch (error) {
    console.log(error);
  }

  next();
};
