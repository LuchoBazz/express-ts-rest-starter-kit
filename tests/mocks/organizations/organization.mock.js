"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomOrganizationPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomOrganizationPrisma = ({ organization_id = faker_1.faker.string.uuid(), organization_name = faker_1.faker.company.name(), organization_client_id = "CLIENT_ID", organization_created_at = new Date(), organization_updated_at = new Date(), } = {}) => {
    return {
        organization_id,
        organization_name,
        organization_client_id,
        organization_created_at,
        organization_updated_at,
    };
};
exports.genRandomOrganizationPrisma = genRandomOrganizationPrisma;
