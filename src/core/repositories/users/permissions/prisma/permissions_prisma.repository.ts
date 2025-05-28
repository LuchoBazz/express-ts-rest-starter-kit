import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { PermissionEntity } from "../../../../entities/users/permission.entity";
import { PermissionRepository } from "../permissions_repository.interface";

export const PrismaPermissionRepository: PermissionRepository = {
  async findOne(client: unknown, name: string): Promise<PermissionEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const record = await prismaClient.permission.findUnique({ where: { permission_name: name } });

      return record ? PermissionEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, permission: PermissionEntity): Promise<PermissionEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.permission.create({
        data: {
          permission_id: permission.getId(),
          permission_name: permission.getName(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return PermissionEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, name: string): Promise<PermissionEntity> {
    const prismaClient = client as PrismaClient;
    try {
      const record = prismaClient.permission.delete({ where: { permission_name: name } });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return PermissionEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
