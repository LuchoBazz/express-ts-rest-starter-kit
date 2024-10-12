"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeatureFlagController = exports.updateFeatureFlagController = exports.createFeatureFlagController = exports.findFeatureFlagController = void 0;
const feature_flag_entity_1 = require("../../../../core/entities/organizations/feature_flag.entity");
const feature_flag_interactor_1 = require("../../../../core/interactors/organizations/feature_flag.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const feature_flag_presenter_1 = require("../../../presenters/organizations/feature_flag.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findFeatureFlagController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.featureFlagKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const featureFlagFound = await (0, feature_flag_interactor_1.findFeatureFlagInteractor)({ key, clientId });
            const responseFeatureFlag = (0, feature_flag_presenter_1.presentFeatureFlag)(featureFlagFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseFeatureFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createFeatureFlagController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.createFeatureFlagSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { key, percentage, is_experimental: isExperimental } = request.body;
            const isActive = true;
            const featureFlag = new feature_flag_entity_1.FeatureFlagEntity(key, percentage, isExperimental, isActive, clientId);
            const featureFlagCreated = await (0, feature_flag_interactor_1.createFeatureFlagInteractor)(featureFlag);
            const responseFeatureFlag = (0, feature_flag_presenter_1.presentFeatureFlag)(featureFlagCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseFeatureFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updateFeatureFlagController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.featureFlagKeyParamsSchema),
    (0, validator_1.validateSchema)(schemas_1.updateFeatureFlagSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const { percentage, is_experimental: isExperimental, is_active: isActive } = request.body;
            const featureFlag = {
                key,
                percentage: percentage !== null && percentage !== void 0 ? percentage : undefined,
                isExperimental: isExperimental !== null && isExperimental !== void 0 ? isExperimental : undefined,
                isActive: isActive !== null && isActive !== void 0 ? isActive : undefined,
                clientId,
            };
            const featureFlagCreated = await (0, feature_flag_interactor_1.updateFeatureFlagInteractor)(featureFlag);
            const responseFeatureFlag = (0, feature_flag_presenter_1.presentFeatureFlag)(featureFlagCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseFeatureFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteFeatureFlagController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.featureFlagKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, key } = request.params;
            const featureFlagDeleted = await (0, feature_flag_interactor_1.deleteFeatureFlagInteractor)({ key, clientId });
            const responseFeatureFlag = (0, feature_flag_presenter_1.presentFeatureFlag)(featureFlagDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseFeatureFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
