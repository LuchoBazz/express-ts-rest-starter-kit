"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCachePermissions = exports.CachePermissions = void 0;
class CachePermissions {
}
exports.CachePermissions = CachePermissions;
class RoleCachePermissions extends CachePermissions {
    constructor(role) {
        super();
        this.role = role;
    }
    generateKey() {
        return `${this.getRole()}`;
    }
    getSearchValues() {
        return [this.getRole()];
    }
    getRole() {
        return this.role;
    }
}
exports.RoleCachePermissions = RoleCachePermissions;
