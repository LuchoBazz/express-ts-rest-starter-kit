import { NextFunction, Request, Response } from "express";

import { ErrorMessage } from "../../errors/errors.enum";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { PermissionsValues } from "../entities/authentication.entity";

export const permissionChecker = (requiredPermissions: PermissionsValues[]) => {
  return (request: Request, _: Response, next: NextFunction): void => {
    console.log({ request });

    // request.user.getPermissions()
    const userPermissions: PermissionsValues[] = [PermissionsValues.GUEST_USER];

    const hasRequiredPermissions: boolean = requiredPermissions.every((permission) => {
      return userPermissions.includes(permission);
    });

    if (hasRequiredPermissions) {
      return next();
    }

    const error = new UnauthorizedError(ErrorMessage.INSUFFICIENT_ACCESS_PERMISSIONS, []);
    return next(error);
  };
};
