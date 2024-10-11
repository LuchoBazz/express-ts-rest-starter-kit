"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeatureFlagInteractor = exports.updateFeatureFlagInteractor = exports.createFeatureFlagInteractor = exports.findFeatureFlagInteractor = void 0;
const errors_enum_1 = require("../../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../../infrastructure/database/prisma");
const feature_flag_service_1 = require("../../../services/organizations/feature_flag.service");
const findFeatureFlagInteractor = async (searchCriteria) => {
    const featureFlagFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, feature_flag_service_1.findFeatureFlagService)(client, searchCriteria);
    });
    if (!featureFlagFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.FEATURE_FLAG_NOT_FOUND);
    }
    return featureFlagFound;
};
exports.findFeatureFlagInteractor = findFeatureFlagInteractor;
const createFeatureFlagInteractor = async (featureFlag) => {
    const featureFlagCreated = await (0, prisma_1.onSession)((client) => {
        return (0, feature_flag_service_1.createFeatureFlagService)(client, featureFlag);
    });
    return featureFlagCreated;
};
exports.createFeatureFlagInteractor = createFeatureFlagInteractor;
const updateFeatureFlagInteractor = async (featureFlag) => {
    const featureFlagUpdated = await (0, prisma_1.onSession)((client) => {
        return (0, feature_flag_service_1.updateFeatureFlagService)(client, featureFlag);
    });
    return featureFlagUpdated;
};
exports.updateFeatureFlagInteractor = updateFeatureFlagInteractor;
const deleteFeatureFlagInteractor = async (searchCriteria) => {
    const featureFlagDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, feature_flag_service_1.deleteFeatureFlagService)(client, searchCriteria);
    });
    return featureFlagDeleted;
};
exports.deleteFeatureFlagInteractor = deleteFeatureFlagInteractor;
