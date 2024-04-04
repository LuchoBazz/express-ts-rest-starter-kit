import { RoleCachePermissions } from "../../../src/entities/cache/permission_cache.entity";
import { UserRole } from "../../../src/entities/users/role.enum";

describe("RoleCachePermissions", () => {
  const role = UserRole.COMMON_USER;
  const cachePermissions = new RoleCachePermissions(role);

  it("generates correct key", () => {
    const key = cachePermissions.generateKey();
    expect(key).toBe(role);
  });

  it("returns correct search values", () => {
    const searchValues = cachePermissions.getSearchValues();
    expect(searchValues).toEqual([role]);
  });

  it("returns correct role", () => {
    const returnedRole = cachePermissions.getRole();
    expect(returnedRole).toBe(role);
  });
});
