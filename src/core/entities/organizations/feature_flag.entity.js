"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagEntity = void 0;
const entity_1 = require("../entity");
class FeatureFlagEntity extends entity_1.Entity {
    constructor(key, percentage, isExperimental, isActive, clientId) {
        super();
        this.key = key;
        this.percentage = percentage;
        this.isExperimental = isExperimental;
        this.isActive = isActive;
        this.clientId = clientId;
    }
    static fromPrisma(payload) {
        const featureFlag = new FeatureFlagEntity(payload.feature_flag_key, payload.feature_flag_percentage, payload.feature_flag_is_experimental, payload.feature_flag_is_active, payload.feature_flag_organization_client_id);
        featureFlag.setId(payload.feature_flag_id);
        return featureFlag;
    }
    getKey() {
        return this.key;
    }
    setKey(key) {
        this.key = key;
    }
    getPercentage() {
        return this.percentage;
    }
    setPercentage(percentage) {
        this.percentage = percentage;
    }
    getIsExperimental() {
        return this.isExperimental;
    }
    setIsExperimental(isExperimental) {
        this.isExperimental = isExperimental;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(isActive) {
        this.isActive = isActive;
    }
    getClientId() {
        return this.clientId;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
}
exports.FeatureFlagEntity = FeatureFlagEntity;
