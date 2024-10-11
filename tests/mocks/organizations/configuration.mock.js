"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomConfigurationPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomConfigurationPrisma = ({ configuration_id = faker_1.faker.string.uuid(), configuration_key = faker_1.faker.string.alpha(), configuration_value = faker_1.faker.string.alpha(), configuration_type = "JSON", configuration_organization_client_id = faker_1.faker.string.alphanumeric(10), configuration_created_at = new Date(), configuration_updated_at = new Date(), } = {}) => {
    return {
        configuration_id,
        configuration_key,
        configuration_value,
        configuration_type,
        configuration_organization_client_id,
        configuration_created_at,
        configuration_updated_at,
    };
};
exports.genRandomConfigurationPrisma = genRandomConfigurationPrisma;
