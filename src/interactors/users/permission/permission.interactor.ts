import { PrismaClient } from "@prisma/client";

import { PermissionEntity } from "../../../entities/users/permission.entity";
import { ErrorMessage } from "../../../errors/errors.enum";
import { NotFoundError } from "../../../errors/not_found.error";
import {
  createPermissionService,
  deletePermissionService,
  findPermissionService,
} from "../../../services/users/permission.service";
import { onSession } from "../../../utils/prisma";

export const findPermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionFound = await onSession(async (client: PrismaClient) => {
    return findPermissionService(client, name);
  });

  if (!permissionFound) {
    throw new NotFoundError(ErrorMessage.PERMISSION_NOT_FOUND);
  }

  return permissionFound;
};

export const createPermissionInteractor = async (role: PermissionEntity): Promise<PermissionEntity> => {
  const permissionCreated = await onSession((client: PrismaClient) => {
    return createPermissionService(client, role);
  });

  return permissionCreated;
};

export const deletePermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionDeleted = await onSession((client: PrismaClient) => {
    return deletePermissionService(client, name);
  });

  return permissionDeleted;
};
