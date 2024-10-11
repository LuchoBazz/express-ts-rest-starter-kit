"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission_cache_entity_1 = require("../../../../../src/core/entities/cache/permission_cache.entity");
const role_enum_1 = require("../../../../../src/core/entities/users/role.enum");
describe("Given a RoleCachePermissions instance", () => {
    const role = role_enum_1.UserRole.COMMON_USER;
    const cachePermissions = new permission_cache_entity_1.RoleCachePermissions(role);
    it("should generates correct key", () => {
        const key = cachePermissions.generateKey();
        expect(key).toBe(role);
    });
    it("should returns correct search values", () => {
        const searchValues = cachePermissions.getSearchValues();
        expect(searchValues).toEqual([role]);
    });
    it("should returns correct role", () => {
        const returnedRole = cachePermissions.getRole();
        expect(returnedRole).toBe(role);
    });
});
