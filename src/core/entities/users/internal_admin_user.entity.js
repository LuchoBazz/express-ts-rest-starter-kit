"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalAdminUserEntity = void 0;
const authentication_enum_1 = require("./authentication.enum");
const role_enum_1 = require("./role.enum");
const user_base_entity_1 = require("./user_base.entity");
class InternalAdminUserEntity extends user_base_entity_1.BaseUserEntity {
    constructor(firstName, lastName, email, clientId) {
        super(firstName, lastName, email, role_enum_1.UserRole.INTERNAL_ADMIN, clientId);
    }
    getPermissions() {
        // TODO: Get permissions from DB
        return Promise.resolve([authentication_enum_1.PermissionsValues.GUEST_USER]);
    }
}
exports.InternalAdminUserEntity = InternalAdminUserEntity;
