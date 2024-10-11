"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = exports.UserRole = void 0;
const entity_1 = require("../entity");
var UserRole;
(function (UserRole) {
    UserRole["INTERNAL_ADMIN"] = "INTERNAL_ADMIN";
    UserRole["EXTERNAL_ADMIN"] = "EXTERNAL_ADMIN";
    UserRole["COMMON_USER"] = "COMMON_USER";
})(UserRole || (exports.UserRole = UserRole = {}));
class RoleEntity extends entity_1.Entity {
    constructor(name) {
        super();
        this.name = name;
    }
    static fromPrisma(payload) {
        const role = new RoleEntity(payload.role_name);
        role.setId(payload.role_id);
        return role;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
}
exports.RoleEntity = RoleEntity;
