import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { PermissionEntity } from "../../entities/users/permission.entity";

export const findPermissionService = async (client: PrismaClient, name: string): Promise<PermissionEntity | null> => {
  try {
    const record = await client.permission.findUnique({ where: { permission_name: name } });

    return record ? PermissionEntity.fromPrisma(record) : null;
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
    const record = client.permission.create({
      data: {
        permission_id: permission.getId(),
        permission_name: permission.getName(),
      },
    });

    const [recordCreated] = await client.$transaction([record]);
    return PermissionEntity.fromPrisma(recordCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deletePermissionService = async (client: PrismaClient, name: string): Promise<PermissionEntity> => {
  try {
    const record = client.permission.delete({ where: { permission_name: name } });

    const [recordDeleted] = await client.$transaction([record]);
    return PermissionEntity.fromPrisma(recordDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
