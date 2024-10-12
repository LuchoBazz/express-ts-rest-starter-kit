"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentFeatureFlag = void 0;
const presentFeatureFlag = (featureFlag) => {
    return {
        id: featureFlag.getId(),
        key: featureFlag.getKey(),
        percentage: featureFlag.getPercentage(),
        is_experimental: featureFlag.getIsExperimental(),
        is_active: featureFlag.getIsActive(),
        organization_client_id: featureFlag.getClientId(),
    };
};
exports.presentFeatureFlag = presentFeatureFlag;
