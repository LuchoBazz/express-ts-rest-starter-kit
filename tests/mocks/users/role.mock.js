"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomRolePrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomRolePrisma = ({ role_id = faker_1.faker.string.uuid(), role_name = faker_1.faker.string.alpha(10), role_created_at = new Date(), role_updated_at = new Date(), } = {}) => {
    return {
        role_id,
        role_name,
        role_created_at,
        role_updated_at,
    };
};
exports.genRandomRolePrisma = genRandomRolePrisma;
