import { NextFunction, Request, Response } from "express";

import { PermissionsValues } from "../../entities/users/authentication.enum";
import { ErrorMessage } from "../../errors/errors.enum";
import { UnauthorizedError } from "../../errors/unauthorized.error";

export const permissionChecker = (requiredPermissions: PermissionsValues[]) => {
  return (_request: Request, _: Response, next: NextFunction): void => {
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
