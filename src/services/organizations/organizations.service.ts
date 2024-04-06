import { PrismaClient } from "@prisma/client";

import { OrganizationEntity } from "../../entities/organizations/organization.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { InternalServerError } from "../../errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../errors/prisma_global_exception_filter";

export const findOrganizationService = async (
  client: PrismaClient,
  clientId: string,
): Promise<OrganizationEntity | null> => {
  try {
    const organization = await client.organization.findUnique({
      where: {
        organization_client_id: clientId,
      },
    });

    return organization ? OrganizationEntity.fromPrisma(organization) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createOrganizationService = async (
  client: PrismaClient,
  organization: OrganizationEntity,
): Promise<OrganizationEntity> => {
  try {
    const createOrganizationTransaction = client.organization.create({
      data: {
        organization_id: organization.getId(),
        organization_name: organization.getName(),
        organization_client_id: organization.getClientId(),
      },
    });

    const [organizationCreated] = await client.$transaction([createOrganizationTransaction]);
    return OrganizationEntity.fromPrisma(organizationCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateOrganizationService = async (
  client: PrismaClient,
  organization: OrganizationEntity,
): Promise<OrganizationEntity> => {
  try {
    const updateOrganizationTransaction = client.organization.update({
      where: {
        organization_client_id: organization.getClientId(),
      },
      data: {
        organization_name: organization.getName(),
      },
    });

    const [organizationUpdated] = await client.$transaction([updateOrganizationTransaction]);
    return OrganizationEntity.fromPrisma(organizationUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteOrganizationService = async (
  client: PrismaClient,
  clientId: string,
): Promise<OrganizationEntity> => {
  try {
    const deleteOrganizationTransaction = client.organization.delete({
      where: {
        organization_client_id: clientId,
      },
    });

    const [organizationDeleted] = await client.$transaction([deleteOrganizationTransaction]);
    return OrganizationEntity.fromPrisma(organizationDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
