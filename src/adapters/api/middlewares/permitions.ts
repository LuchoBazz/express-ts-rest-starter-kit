import { NextFunction, Request, Response } from "express";

import { PermissionsValues } from "../../../core/entities/users/authentication.enum";
import { ErrorMessage } from "../errors/errors.enum";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const permissionChecker = (requiredPermissions: PermissionsValues[]) => {
  return async (request: Request, _: Response, next: NextFunction): Promise<void> => {
    const unauthorizedError = new UnauthorizedError(ErrorMessage.INSUFFICIENT_ACCESS_PERMISSIONS, []);
    try {
      const { user } = request;

      const userPermissions: PermissionsValues[] = user ? await user.getPermissions() : [PermissionsValues.GUEST_MODE];

      const hasRequiredPermissions: boolean = requiredPermissions.every((permission) => {
        return userPermissions.includes(permission);
      });

      if (hasRequiredPermissions) {
        return next();
      }

      return next(unauthorizedError);
    } catch (error) {
      console.log(error);
      return next(unauthorizedError);
    }
  };
};
