"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionOnRoleEntity = void 0;
const entity_1 = require("../entity");
class PermissionOnRoleEntity extends entity_1.Entity {
    constructor(roleName, permissionName) {
        super();
        this.roleName = roleName;
        this.permissionName = permissionName;
    }
    static fromPrisma(payload) {
        const role = new PermissionOnRoleEntity(payload.permissions_on_roles_role_name, payload.permissions_on_roles_permission_name);
        role.setId(payload.permissions_on_roles_role_name + "-" + payload.permissions_on_roles_permission_name);
        return role;
    }
    getRoleName() {
        return this.roleName;
    }
    setRoleName(value) {
        this.roleName = value;
    }
    getPermissionName() {
        return this.permissionName;
    }
    setPermissionName(value) {
        this.permissionName = value;
    }
}
exports.PermissionOnRoleEntity = PermissionOnRoleEntity;
