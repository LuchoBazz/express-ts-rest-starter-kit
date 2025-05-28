import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { RoleEntity } from "../../../../entities/users/role.enum";
import { RoleRepository } from "../roles_repository.interface";

export const PrismaRoleRepository: RoleRepository = {
  async findOne(client: unknown, name: string): Promise<RoleEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const record = await prismaClient.role.findUnique({ where: { role_name: name } });

      return record ? RoleEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, role: RoleEntity): Promise<RoleEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.role.create({
        data: {
          role_id: role.getId(),
          role_name: role.getName(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return RoleEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, name: string): Promise<RoleEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.role.delete({ where: { role_name: name } });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return RoleEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
