"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organizationServiceMock = jest.fn();
const organization_entity_1 = require("../../../../../src/core/entities/organizations/organization.entity");
const organization_interactor_1 = require("../../../../../src/core/interactors/organizations/organization.interactor");
const organization_mock_1 = require("../../../../mocks/organizations/organization.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/organizations/organizations.service", () => {
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
    let organization;
    beforeEach(() => {
        const organizationPrisma = (0, organization_mock_1.genRandomOrganizationPrisma)();
        organization = organization_entity_1.OrganizationEntity.fromPrisma(organizationPrisma);
        organizationServiceMock.mockImplementation(() => {
            return Promise.resolve(organization);
        });
    });
    afterEach(() => {
        organizationServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get organization successfully", async () => {
        const organizationFound = await (0, organization_interactor_1.findOrganizationInteractor)(organization.getClientId());
        expect(organizationFound).toEqual(organization);
        expect(organizationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create organization successfully", async () => {
        const organizationCreated = await (0, organization_interactor_1.createOrganizationInteractor)(organization);
        expect(organizationCreated).toEqual(organization);
        expect(organizationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update organization successfully", async () => {
        const organizationUpdated = await (0, organization_interactor_1.updateOrganizationInteractor)({
            clientId: organization.getClientId(),
            name: organization.getName(),
        });
        expect(organizationUpdated).toEqual(organization);
        expect(organizationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete organization successfully", async () => {
        const organizationDeleted = await (0, organization_interactor_1.deleteOrganizationInteractor)(organization.getClientId());
        expect(organizationDeleted).toEqual(organization);
        expect(organizationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
