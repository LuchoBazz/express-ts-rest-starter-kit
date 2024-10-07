import { NextFunction, Request, Response } from "express";

import {
  addPermissionsToRoleInteractor,
  findPermissionsByRoleInteractor,
} from "../../../../core/interactors/users/permission/permission_on_role.interactor";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentPermission } from "../../../presenters/users/permission.presenter";
import { validateSchema } from "../../validator";
import { addPermissionsToRoleSchema, permissionOnRoleSchema } from "./schemas";

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

export const addPermissionsToRoleController = [
  validateSchema(addPermissionsToRoleSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { role_name, permissions } = request.body;

      const permissionsFound = await addPermissionsToRoleInteractor(role_name as string, permissions as string[]);

      const responsePermissions = permissionsFound.map(presentPermission);
      response.status(HttpStatusCode.OK).json({ data: responsePermissions });
    } catch (error) {
      next(error);
    }
  },
];
