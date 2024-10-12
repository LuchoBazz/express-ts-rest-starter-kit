"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizationInteractor = exports.updateOrganizationInteractor = exports.createOrganizationInteractor = exports.findOrganizationInteractor = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../infrastructure/database/prisma");
const organizations_service_1 = require("../../services/organizations/organizations.service");
const findOrganizationInteractor = async (clientId) => {
    const organizationFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, organizations_service_1.findOrganizationService)(client, clientId);
    });
    if (!organizationFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.ORGANIZATION_NOT_FOUND);
    }
    return organizationFound;
};
exports.findOrganizationInteractor = findOrganizationInteractor;
const createOrganizationInteractor = async (organization) => {
    const organizationCreated = await (0, prisma_1.onSession)((client) => {
        return (0, organizations_service_1.createOrganizationService)(client, organization);
    });
    return organizationCreated;
};
exports.createOrganizationInteractor = createOrganizationInteractor;
const updateOrganizationInteractor = async (organization) => {
    const organizationUpdated = await (0, prisma_1.onSession)((client) => {
        return (0, organizations_service_1.updateOrganizationService)(client, organization);
    });
    return organizationUpdated;
};
exports.updateOrganizationInteractor = updateOrganizationInteractor;
const deleteOrganizationInteractor = async (clientId) => {
    const organizationDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, organizations_service_1.deleteOrganizationService)(client, clientId);
    });
    return organizationDeleted;
};
exports.deleteOrganizationInteractor = deleteOrganizationInteractor;
