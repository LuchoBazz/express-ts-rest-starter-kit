import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { OrganizationEntity } from "../../entities/organizations/organization.entity";
import { getOrganizationRepository } from "../../repositories/organizations/organizations";
import { UpdateOrganizationInput } from "../../types/organizations/organization.types";

export const findOrganizationInteractor = async (clientId: string): Promise<OrganizationEntity> => {
  const organizationRepository = getOrganizationRepository();
  const organizationFound = await onSession(async (client: PrismaClient) => {
    return organizationRepository.findOne(client, clientId);
  });

  if (!organizationFound) {
    throw new NotFoundError(ErrorMessage.ORGANIZATION_NOT_FOUND);
  }

  return organizationFound;
};

export const createOrganizationInteractor = async (organization: OrganizationEntity): Promise<OrganizationEntity> => {
  const organizationRepository = getOrganizationRepository();
  const organizationCreated = await onSession((client: PrismaClient) => {
    return organizationRepository.create(client, organization);
  });

  return organizationCreated;
};

export const updateOrganizationInteractor = async (
  organization: UpdateOrganizationInput,
): Promise<OrganizationEntity> => {
  const organizationRepository = getOrganizationRepository();
  const organizationUpdated = await onSession((client: PrismaClient) => {
    return organizationRepository.update(client, organization);
  });

  return organizationUpdated;
};

export const deleteOrganizationInteractor = async (clientId: string): Promise<OrganizationEntity> => {
  const organizationRepository = getOrganizationRepository();
  const organizationDeleted = await onSession((client: PrismaClient) => {
    return organizationRepository.delete(client, clientId);
  });

  return organizationDeleted;
};
