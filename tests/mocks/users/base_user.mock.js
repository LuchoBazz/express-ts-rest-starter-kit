"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomBaseUserPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const role_enum_1 = require("../../../src/core/entities/users/role.enum");
const genRandomBaseUserPrisma = ({ user_id = faker_1.faker.string.uuid(), user_first_name = faker_1.faker.person.firstName(), user_last_name = faker_1.faker.person.lastName(), user_email = faker_1.faker.internet.email(), user_role = role_enum_1.UserRole.COMMON_USER, user_organization_client_id = "CLIENT_ID", user_created_at = new Date(), user_updated_at = new Date(), } = {}) => {
    return {
        user_id,
        user_first_name,
        user_last_name,
        user_email,
        user_role,
        user_organization_client_id,
        user_created_at,
        user_updated_at,
    };
};
exports.genRandomBaseUserPrisma = genRandomBaseUserPrisma;
