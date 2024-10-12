"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConfigurationService = exports.updateConfigurationService = exports.createConfigurationService = exports.findConfigurationService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const configuration_entity_1 = require("../../entities/organizations/configuration.entity");
const findConfigurationService = async (client, searchCriteria) => {
    try {
        const { key, clientId } = searchCriteria;
        const record = await client.configuration.findUnique({
            where: {
                unique_configuration_key_and_configuration_organization_client_id: {
                    configuration_key: key,
                    configuration_organization_client_id: clientId,
                },
            },
        });
        return record ? configuration_entity_1.ConfigurationEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findConfigurationService = findConfigurationService;
const createConfigurationService = async (client, config) => {
    try {
        const record = client.configuration.create({
            data: {
                configuration_id: config.getId(),
                configuration_key: config.getKey(),
                configuration_value: config.getValue(),
                configuration_type: config.getType(),
                configuration_organization_client_id: config.getClientId(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return configuration_entity_1.ConfigurationEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createConfigurationService = createConfigurationService;
const updateConfigurationService = async (client, configuration) => {
    try {
        const record = client.configuration.update({
            where: {
                unique_configuration_key_and_configuration_organization_client_id: {
                    configuration_key: configuration.key,
                    configuration_organization_client_id: configuration.clientId,
                },
            },
            data: {
                configuration_key: configuration.key,
                configuration_value: configuration.value,
                configuration_type: configuration.type,
            },
        });
        const [recordUpdated] = await client.$transaction([record]);
        return configuration_entity_1.ConfigurationEntity.fromPrisma(recordUpdated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updateConfigurationService = updateConfigurationService;
const deleteConfigurationService = async (client, searchCriteria) => {
    try {
        const { key, clientId } = searchCriteria;
        const record = client.configuration.delete({
            where: {
                unique_configuration_key_and_configuration_organization_client_id: {
                    configuration_key: key,
                    configuration_organization_client_id: clientId,
                },
            },
        });
        const [recordDeleted] = await client.$transaction([record]);
        return configuration_entity_1.ConfigurationEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteConfigurationService = deleteConfigurationService;
