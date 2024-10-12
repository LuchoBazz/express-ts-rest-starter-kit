import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { PermissionEntity } from "../../entities/users/permission.entity";
import {
  createPermissionService,
  deletePermissionService,
  findPermissionService,
} from "../../services/users/permission.service";

export const findPermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionFound = await onSession(async (client: PrismaClient) => {
    return findPermissionService(client, name);
  });

  if (!permissionFound) {
    throw new NotFoundError(ErrorMessage.PERMISSION_NOT_FOUND);
  }

  return permissionFound;
};

export const createPermissionInteractor = async (permission: PermissionEntity): Promise<PermissionEntity> => {
  const permissionCreated = await onSession((client: PrismaClient) => {
    return createPermissionService(client, permission);
  });

  return permissionCreated;
};

export const deletePermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionDeleted = await onSession((client: PrismaClient) => {
    return deletePermissionService(client, name);
  });

  return permissionDeleted;
};
