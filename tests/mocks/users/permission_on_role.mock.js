"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomPermissionOnRolePrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomPermissionOnRolePrisma = ({ permissions_on_roles_role_name = faker_1.faker.string.alpha(10), permissions_on_roles_permission_name = faker_1.faker.string.alpha(10), permissions_on_roles_created_at = new Date(), permissions_on_roles_updated_at = new Date(), } = {}) => {
    return {
        permissions_on_roles_role_name,
        permissions_on_roles_permission_name,
        permissions_on_roles_created_at,
        permissions_on_roles_updated_at,
    };
};
exports.genRandomPermissionOnRolePrisma = genRandomPermissionOnRolePrisma;
