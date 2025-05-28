import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { OrganizationEntity } from "../../../../entities/organizations/organization.entity";
import { UpdateOrganizationInput } from "../../../../types/organizations/organization.types";
import { OrganizationRepository } from "../organizations_repository.interface";

export const PrismaOrganizationRepository: OrganizationRepository = {
  async findOne(client: unknown, clientId: string): Promise<OrganizationEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const record = await prismaClient.organization.findUnique({
        where: {
          organization_client_id: clientId,
        },
      });

      return record ? OrganizationEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, organization: OrganizationEntity): Promise<OrganizationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.organization.create({
        data: {
          organization_id: organization.getId(),
          organization_name: organization.getName(),
          organization_client_id: organization.getClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return OrganizationEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(client: unknown, organization: UpdateOrganizationInput): Promise<OrganizationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.organization.update({
        where: {
          organization_client_id: organization.clientId,
        },
        data: {
          organization_name: organization.name,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return OrganizationEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, clientId: string): Promise<OrganizationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.organization.delete({
        where: {
          organization_client_id: clientId,
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return OrganizationEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
