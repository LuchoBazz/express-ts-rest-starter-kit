"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeatureFlagService = exports.updateFeatureFlagService = exports.createFeatureFlagService = exports.findFeatureFlagService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const feature_flag_entity_1 = require("../../entities/organizations/feature_flag.entity");
const findFeatureFlagService = async (client, searchCriteria) => {
    try {
        const { key, clientId } = searchCriteria;
        const record = await client.featureFlag.findUnique({
            where: {
                unique_feature_flag_key_and_feature_flag_organization_client_id: {
                    feature_flag_key: key,
                    feature_flag_organization_client_id: clientId,
                },
            },
        });
        return record ? feature_flag_entity_1.FeatureFlagEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findFeatureFlagService = findFeatureFlagService;
const createFeatureFlagService = async (client, featureFlag) => {
    try {
        const record = client.featureFlag.create({
            data: {
                feature_flag_id: featureFlag.getId(),
                feature_flag_key: featureFlag.getKey(),
                feature_flag_percentage: featureFlag.getPercentage(),
                feature_flag_is_active: featureFlag.getIsActive(),
                feature_flag_organization_client_id: featureFlag.getClientId(),
                feature_flag_is_experimental: featureFlag.getIsExperimental(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return feature_flag_entity_1.FeatureFlagEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createFeatureFlagService = createFeatureFlagService;
const updateFeatureFlagService = async (client, featureFlag) => {
    try {
        const record = client.featureFlag.update({
            where: {
                unique_feature_flag_key_and_feature_flag_organization_client_id: {
                    feature_flag_key: featureFlag.key,
                    feature_flag_organization_client_id: featureFlag.clientId,
                },
            },
            data: {
                feature_flag_key: featureFlag.key,
                feature_flag_percentage: featureFlag.percentage,
                feature_flag_is_active: featureFlag.isActive,
                feature_flag_is_experimental: featureFlag.isExperimental,
            },
        });
        const [recordUpdated] = await client.$transaction([record]);
        return feature_flag_entity_1.FeatureFlagEntity.fromPrisma(recordUpdated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updateFeatureFlagService = updateFeatureFlagService;
const deleteFeatureFlagService = async (client, searchCriteria) => {
    try {
        const { key, clientId } = searchCriteria;
        const record = client.featureFlag.delete({
            where: {
                unique_feature_flag_key_and_feature_flag_organization_client_id: {
                    feature_flag_key: key,
                    feature_flag_organization_client_id: clientId,
                },
            },
        });
        const [recordDeleted] = await client.$transaction([record]);
        return feature_flag_entity_1.FeatureFlagEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteFeatureFlagService = deleteFeatureFlagService;
