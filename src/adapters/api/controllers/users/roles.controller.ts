import { NextFunction, Request, Response } from "express";

import { RoleEntity } from "../../../../core/entities/users/role.enum";
import {
  createRoleInteractor,
  deleteRoleInteractor,
  findRoleInteractor,
} from "../../../../core/interactors/users/role.interactor";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentRole } from "../../../presenters/users/role.presenter";
import { validateSchema } from "../../validator";
import { roleSchema } from "./schemas";

export const findRoleController = [
  validateSchema(roleSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;

      const roleFound = await findRoleInteractor(name);

      const roleFlag = presentRole(roleFound);
      response.status(HttpStatusCode.OK).json({ data: roleFlag });
    } catch (error) {
      next(error);
    }
  },
];

export const createRoleController = [
  validateSchema(roleSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;
      const role = new RoleEntity(name);

      const roleCreated = await createRoleInteractor(role);

      const responseRole = presentRole(roleCreated);
      response.status(HttpStatusCode.OK).json({ data: responseRole });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteRoleController = [
  validateSchema(roleSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;

      const roleDeleted = await deleteRoleInteractor(name);

      const responseRole = presentRole(roleDeleted);
      response.status(HttpStatusCode.OK).json({ data: responseRole });
    } catch (error) {
      next(error);
    }
  },
];
