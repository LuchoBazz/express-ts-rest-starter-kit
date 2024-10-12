"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizationService = exports.updateOrganizationService = exports.createOrganizationService = exports.findOrganizationService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const organization_entity_1 = require("../../entities/organizations/organization.entity");
const findOrganizationService = async (client, clientId) => {
    try {
        const record = await client.organization.findUnique({
            where: {
                organization_client_id: clientId,
            },
        });
        return record ? organization_entity_1.OrganizationEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findOrganizationService = findOrganizationService;
const createOrganizationService = async (client, organization) => {
    try {
        const record = client.organization.create({
            data: {
                organization_id: organization.getId(),
                organization_name: organization.getName(),
                organization_client_id: organization.getClientId(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return organization_entity_1.OrganizationEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createOrganizationService = createOrganizationService;
const updateOrganizationService = async (client, organization) => {
    try {
        const record = client.organization.update({
            where: {
                organization_client_id: organization.clientId,
            },
            data: {
                organization_name: organization.name,
            },
        });
        const [recordUpdated] = await client.$transaction([record]);
        return organization_entity_1.OrganizationEntity.fromPrisma(recordUpdated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updateOrganizationService = updateOrganizationService;
const deleteOrganizationService = async (client, clientId) => {
    try {
        const record = client.organization.delete({
            where: {
                organization_client_id: clientId,
            },
        });
        const [recordDeleted] = await client.$transaction([record]);
        return organization_entity_1.OrganizationEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteOrganizationService = deleteOrganizationService;
