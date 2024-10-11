"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomFeatureFlagPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomFeatureFlagPrisma = ({ feature_flag_id = faker_1.faker.string.uuid(), feature_flag_key = faker_1.faker.string.alpha(), feature_flag_percentage = faker_1.faker.number.int({ min: 0, max: 100 }), feature_flag_is_experimental = false, feature_flag_is_active = true, feature_flag_organization_client_id = "CLIENT_ID", feature_flag_created_at = new Date(), feature_flag_updated_at = new Date(), } = {}) => {
    return {
        feature_flag_id,
        feature_flag_key,
        feature_flag_percentage,
        feature_flag_is_experimental,
        feature_flag_is_active,
        feature_flag_organization_client_id,
        feature_flag_created_at,
        feature_flag_updated_at,
    };
};
exports.genRandomFeatureFlagPrisma = genRandomFeatureFlagPrisma;
