import { NextFunction, Request, Response } from "express";

import { AuthProvider, AuthType, CommonUserEntity } from "../../../core/entities/users/common_user.entity";

export const addUserToRequestMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  const authorization = request.headers.Authorization;

  request.user = authorization
    ? new CommonUserEntity(
        "",
        "",
        "",
        "",
        null,
        null,
        true,
        true,
        true,
        "",
        AuthProvider.FIREBASE,
        AuthType.EMAIL_AND_PASSWORD,
        "",
      )
    : undefined;

  next();
};
