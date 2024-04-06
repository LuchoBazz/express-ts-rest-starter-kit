import { PrismaClient } from "@prisma/client";

import { OrganizationEntity } from "../../../entities/organizations/organization.entity";
import { ErrorMessage } from "../../../errors/errors.enum";
import { NotFoundError } from "../../../errors/not_found.error";
import {
  createOrganizationService,
  deleteOrganizationService,
  findOrganizationService,
  updateOrganizationService,
} from "../../../services/organizations/organizations.service";
import { onSession } from "../../../utils/prisma";
import { UpdateOrganizationInput } from "./organization.types";

export const findOrganizationInteractor = async (clientId: string): Promise<OrganizationEntity> => {
  const organizationFound = await onSession(async (client: PrismaClient) => {
    return findOrganizationService(client, clientId);
  });

  if (!organizationFound) {
    throw new NotFoundError(ErrorMessage.ORGANIZATION_NOT_FOUND);
  }

  return organizationFound;
};

export const createOrganizationInteractor = async (organization: OrganizationEntity): Promise<OrganizationEntity> => {
  const organizationCreated = await onSession((client: PrismaClient) => {
    return createOrganizationService(client, organization);
  });

  return organizationCreated;
};

export const updateOrganizationInteractor = async (
  organization: UpdateOrganizationInput,
): Promise<OrganizationEntity> => {
  const organizationUpdated = await onSession((client: PrismaClient) => {
    return updateOrganizationService(client, organization);
  });

  return organizationUpdated;
};

export const deleteOrganizationInteractor = async (clientId: string): Promise<OrganizationEntity> => {
  const organizationDeleted = await onSession((client: PrismaClient) => {
    return deleteOrganizationService(client, clientId);
  });

  return organizationDeleted;
};
