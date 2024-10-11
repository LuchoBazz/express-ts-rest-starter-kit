"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEntity = void 0;
const entity_1 = require("../entity");
class PermissionEntity extends entity_1.Entity {
    constructor(name) {
        super();
        this.name = name;
    }
    static fromPrisma(payload) {
        const permission = new PermissionEntity(payload.permission_name);
        permission.setId(payload.permission_id);
        return permission;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
}
exports.PermissionEntity = PermissionEntity;
