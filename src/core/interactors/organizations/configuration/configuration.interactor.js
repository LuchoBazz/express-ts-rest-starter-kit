"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConfigurationInteractor = exports.updateConfigurationInteractor = exports.createConfigurationInteractor = exports.findConfigurationInteractor = void 0;
const errors_enum_1 = require("../../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../../infrastructure/database/prisma");
const configuration_service_1 = require("../../../services/organizations/configuration.service");
const findConfigurationInteractor = async (searchCriteria) => {
    const configurationFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, configuration_service_1.findConfigurationService)(client, searchCriteria);
    });
    if (!configurationFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.CONFIGURATION_NOT_FOUND);
    }
    return configurationFound;
};
exports.findConfigurationInteractor = findConfigurationInteractor;
const createConfigurationInteractor = async (configuration) => {
    const configurationCreated = await (0, prisma_1.onSession)(async (client) => {
        return (0, configuration_service_1.createConfigurationService)(client, configuration);
    });
    return configurationCreated;
};
exports.createConfigurationInteractor = createConfigurationInteractor;
const updateConfigurationInteractor = async (configuration) => {
    const configurationUpdated = await (0, prisma_1.onSession)(async (client) => {
        return (0, configuration_service_1.updateConfigurationService)(client, configuration);
    });
    return configurationUpdated;
};
exports.updateConfigurationInteractor = updateConfigurationInteractor;
const deleteConfigurationInteractor = async (searchCriteria) => {
    const configurationDeleted = await (0, prisma_1.onSession)(async (client) => {
        return (0, configuration_service_1.deleteConfigurationService)(client, searchCriteria);
    });
    return configurationDeleted;
};
exports.deleteConfigurationInteractor = deleteConfigurationInteractor;
