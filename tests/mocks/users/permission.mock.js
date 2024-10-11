"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomPermissionPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomPermissionPrisma = ({ permission_id = faker_1.faker.string.uuid(), permission_name = faker_1.faker.string.alpha(10), permission_created_at = new Date(), permission_updated_at = new Date(), } = {}) => {
    return {
        permission_id,
        permission_name,
        permission_created_at,
        permission_updated_at,
    };
};
exports.genRandomPermissionPrisma = genRandomPermissionPrisma;
