const organizationServiceMock = jest.fn();

import { OrganizationEntity } from "../../../src/entities/organizations/organization.entity";
import {
  createOrganizationInteractor,
  deleteOrganizationInteractor,
  findOrganizationInteractor,
  updateOrganizationInteractor,
} from "../../../src/interactors/organizations/organization/organization.interactor";
import { genRandomOrganizationPrisma } from "../../mocks/organizations/organization.mock";

const disconnectMock = jest.fn();

jest.mock("../../../src/services/organizations/organizations.service", () => {
  return {
    findOrganizationService: organizationServiceMock,
    createOrganizationService: organizationServiceMock,
    updateOrganizationService: organizationServiceMock,
    deleteOrganizationService: organizationServiceMock,
  };
});

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a organization interactor", () => {
  let organization: OrganizationEntity;

  beforeEach(() => {
    const organizationPrisma = genRandomOrganizationPrisma();
    organization = OrganizationEntity.fromPrisma(organizationPrisma);

    organizationServiceMock.mockImplementation(() => {
      return Promise.resolve(organization);
    });
  });

  afterEach(() => {
    organizationServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get organization successfully", async () => {
    const organizationFound = await findOrganizationInteractor(organization.getClientId());

    expect(organizationFound).toEqual(organization);
    expect(organizationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create organization successfully", async () => {
    const organizationCreated = await createOrganizationInteractor(organization);

    expect(organizationCreated).toEqual(organization);
    expect(organizationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update organization successfully", async () => {
    const organizationUpdated = await updateOrganizationInteractor({
      clientId: organization.getClientId(),
      name: organization.getName(),
    });

    expect(organizationUpdated).toEqual(organization);
    expect(organizationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete organization successfully", async () => {
    const organizationDeleted = await deleteOrganizationInteractor(organization.getClientId());

    expect(organizationDeleted).toEqual(organization);
    expect(organizationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
