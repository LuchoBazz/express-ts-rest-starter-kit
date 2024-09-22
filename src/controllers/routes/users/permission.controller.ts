import { NextFunction, Request, Response } from "express";

import { PermissionEntity } from "../../../entities/users/permission.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import {
  createPermissionInteractor,
  deletePermissionInteractor,
  findPermissionInteractor,
} from "../../../interactors/users/permission/permission.interactor";
import { presentPermission } from "../../../presenters/users/permission.presenter";
import { validateSchema } from "../../validator";
import { permissionSchema } from "./schemas";

export const findRoleController = [
  validateSchema(permissionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;

      const permissionFound = await findPermissionInteractor(name);

      const responsePermission = presentPermission(permissionFound);
      response.status(HttpStatusCode.OK).json({ data: responsePermission });
    } catch (error) {
      next(error);
    }
  },
];

export const createRoleController = [
  validateSchema(permissionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;
      const permission = new PermissionEntity(name);

      const permissionCreated = await createPermissionInteractor(permission);

      const responsePermission = presentPermission(permissionCreated);
      response.status(HttpStatusCode.OK).json({ data: responsePermission });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteRoleController = [
  validateSchema(permissionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;

      const permissionDeleted = await deletePermissionInteractor(name);

      const responsePermission = presentPermission(permissionDeleted);
      response.status(HttpStatusCode.OK).json({ data: responsePermission });
    } catch (error) {
      next(error);
    }
  },
];
