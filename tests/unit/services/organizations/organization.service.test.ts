import { PrismaClient } from "@prisma/client";

import {
  OrganizationEntity,
  OrganizationPrisma,
} from "../../../../src/core/entities/organizations/organization.entity";
import {
  createOrganizationService,
  deleteOrganizationService,
  findOrganizationService,
  updateOrganizationService,
} from "../../../../src/core/services/organizations/organizations.service";
import { genRandomOrganizationPrisma } from "../../../mocks/organizations/organization.mock";

const organizationMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        organization: {
          findUnique: organizationMock,
          create: organizationMock,
          update: organizationMock,
          delete: organizationMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given an organization service", () => {
  let prismaClient: PrismaClient;
  let organizationPrisma: OrganizationPrisma;
  let organization: OrganizationEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    organizationPrisma = genRandomOrganizationPrisma();
    organization = OrganizationEntity.fromPrisma(organizationPrisma);

    organizationMock.mockImplementation(() => {
      return organizationPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [organizationPrisma];
    });
  });

  afterEach(() => {
    organizationMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  // TODO: Add test for tests nullable case
  it("should get organization successfully", async () => {
    const orgFound = await findOrganizationService(prismaClient, organization.getClientId());

    expect(orgFound).toEqual(organization);
    expect(organizationMock).toHaveBeenCalledTimes(1);
  });

  it("should create organization successfully", async () => {
    const orgCreated = await createOrganizationService(prismaClient, organization);

    expect(orgCreated).toEqual(organization);
    expect(organizationMock).toHaveBeenCalledTimes(1);
  });

  it("should update organization successfully", async () => {
    const orgUpdated = await updateOrganizationService(prismaClient, {
      clientId: organization.getClientId(),
      name: organization.getName(),
    });

    expect(orgUpdated).toEqual(organization);
    expect(organizationMock).toHaveBeenCalledTimes(1);
  });

  it("should delete organization successfully", async () => {
    const orgDeleted = await deleteOrganizationService(prismaClient, organization.getClientId());

    expect(orgDeleted).toEqual(organization);
    expect(organizationMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for testing errors
});
