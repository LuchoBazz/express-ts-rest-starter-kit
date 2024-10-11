"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const organization_entity_1 = require("../../../../../src/core/entities/organizations/organization.entity");
const organizations_service_1 = require("../../../../../src/core/services/organizations/organizations.service");
const organization_mock_1 = require("../../../../mocks/organizations/organization.mock");
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
    let prismaClient;
    let organizationPrisma;
    let organization;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        organizationPrisma = (0, organization_mock_1.genRandomOrganizationPrisma)();
        organization = organization_entity_1.OrganizationEntity.fromPrisma(organizationPrisma);
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
        const orgFound = await (0, organizations_service_1.findOrganizationService)(prismaClient, organization.getClientId());
        expect(orgFound).toEqual(organization);
        expect(organizationMock).toHaveBeenCalledTimes(1);
    });
    it("should create organization successfully", async () => {
        const orgCreated = await (0, organizations_service_1.createOrganizationService)(prismaClient, organization);
        expect(orgCreated).toEqual(organization);
        expect(organizationMock).toHaveBeenCalledTimes(1);
    });
    it("should update organization successfully", async () => {
        const orgUpdated = await (0, organizations_service_1.updateOrganizationService)(prismaClient, {
            clientId: organization.getClientId(),
            name: organization.getName(),
        });
        expect(orgUpdated).toEqual(organization);
        expect(organizationMock).toHaveBeenCalledTimes(1);
    });
    it("should delete organization successfully", async () => {
        const orgDeleted = await (0, organizations_service_1.deleteOrganizationService)(prismaClient, organization.getClientId());
        expect(orgDeleted).toEqual(organization);
        expect(organizationMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for testing errors
});
