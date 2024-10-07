import { NextFunction, Request, Response } from "express";

import { findPermissionsByRoleInteractor } from "../../../../core/interactors/users/permission/permission_on_role.interactor";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentPermission } from "../../../presenters/users/permission.presenter";
import { validateSchema } from "../../validator";
import { permissionOnRoleSchema } from "./schemas";

export const findPermissionsByRoleController = [
  validateSchema(permissionOnRoleSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { role_name } = request.params;

      const permissionsFound = await findPermissionsByRoleInteractor(role_name);

      const responsePermissions = permissionsFound.map(presentPermission);
      response.status(HttpStatusCode.OK).json({ data: responsePermissions });
    } catch (error) {
      next(error);
    }
  },
];
