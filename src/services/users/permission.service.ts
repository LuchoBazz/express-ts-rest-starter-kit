import { PrismaClient } from "@prisma/client";

import { PermissionEntity } from "../../entities/users/permission.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { InternalServerError } from "../../errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../errors/prisma_global_exception_filter";

export const findPermissionService = async (client: PrismaClient, name: string): Promise<PermissionEntity | null> => {
  try {
    const permission = await client.permission.findUnique({ where: { permission_name: name } });

    return permission ? PermissionEntity.fromPrisma(permission) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createPermissionService = async (
  client: PrismaClient,
  permission: PermissionEntity,
): Promise<PermissionEntity> => {
  try {
    const createPermissionTransaction = client.permission.create({
      data: {
        permission_id: permission.getId(),
        permission_name: permission.getName(),
      },
    });

    const [permissionCreated] = await client.$transaction([createPermissionTransaction]);
    return PermissionEntity.fromPrisma(permissionCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deletePermissionService = async (client: PrismaClient, name: string): Promise<PermissionEntity> => {
  try {
    const deletePermissionTransaction = client.permission.delete({ where: { permission_name: name } });

    const [permissionDeleted] = await client.$transaction([deletePermissionTransaction]);
    return PermissionEntity.fromPrisma(permissionDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
