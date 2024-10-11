"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConfigurationController = exports.updateConfigurationController = exports.createConfigurationController = exports.findConfigurationController = void 0;
const configuration_entity_1 = require("../../../../core/entities/organizations/configuration.entity");
const configuration_interactor_1 = require("../../../../core/interactors/organizations/configuration/configuration.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const configuration_presenter_1 = require("../../../presenters/organizations/configuration.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findConfigurationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.configurationKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const configurationFound = await (0, configuration_interactor_1.findConfigurationInteractor)({ key, clientId });
            const configurationFlag = (0, configuration_presenter_1.presentConfiguration)(configurationFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: configurationFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createConfigurationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.createConfigurationSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { key, value, type } = request.body;
            const config = new configuration_entity_1.ConfigurationEntity(key, value, type, 
            // isActive,
            clientId);
            const configurationCreated = await (0, configuration_interactor_1.createConfigurationInteractor)(config);
            const responseConfiguration = (0, configuration_presenter_1.presentConfiguration)(configurationCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseConfiguration });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updateConfigurationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.configurationKeyParamsSchema),
    (0, validator_1.validateSchema)(schemas_1.updateConfigurationSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const { value, type } = request.body;
            const featureFlag = {
                clientId,
                key,
                type,
                value,
            };
            const configurationUpdated = await (0, configuration_interactor_1.updateConfigurationInteractor)(featureFlag);
            const responseConfiguration = (0, configuration_presenter_1.presentConfiguration)(configurationUpdated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseConfiguration });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteConfigurationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.configurationKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const configurationDeleted = await (0, configuration_interactor_1.deleteConfigurationInteractor)({ key, clientId });
            const responseConfiguration = (0, configuration_presenter_1.presentConfiguration)(configurationDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseConfiguration });
        }
        catch (error) {
            next(error);
        }
    },
];
