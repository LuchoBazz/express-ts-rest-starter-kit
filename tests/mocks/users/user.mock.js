"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomUserPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const common_user_entity_1 = require("../../../src/core/entities/users/common_user.entity");
const role_enum_1 = require("../../../src/core/entities/users/role.enum");
const genRandomUserPrisma = ({ user_id = faker_1.faker.string.uuid(), user_username = faker_1.faker.internet.userName(), user_first_name = faker_1.faker.person.firstName(), user_last_name = faker_1.faker.person.lastName(), user_email = faker_1.faker.internet.email(), user_identification_number = faker_1.faker.number.int({ min: 1, max: 1000000 }).toString(), user_phone_number = faker_1.faker.phone.number(), user_terms = true, user_notifications = true, user_is_active = true, user_uid = faker_1.faker.string.alpha(), user_role = role_enum_1.UserRole.COMMON_USER, user_auth_provider = common_user_entity_1.AuthProvider.FIREBASE, user_auth_type = common_user_entity_1.AuthType.EMAIL_AND_PASSWORD, user_organization_client_id = "CLIENT_ID", user_created_at = new Date(), user_updated_at = new Date(), } = {}) => {
    return {
        user_id,
        user_username,
        user_first_name,
        user_last_name,
        user_email,
        user_identification_number,
        user_phone_number,
        user_terms,
        user_notifications,
        user_is_active,
        user_uid,
        user_role,
        user_auth_provider,
        user_auth_type,
        user_organization_client_id,
        user_created_at,
        user_updated_at,
    };
};
exports.genRandomUserPrisma = genRandomUserPrisma;
