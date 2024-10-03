import { faker } from "@faker-js/faker";

import { PermissionOnRolePrisma } from "../../../src/core/entities/users/permission_on_role.entity";

export const genRandomPermissionOnRolePrisma = ({
  permissions_on_roles_role_name = faker.string.alpha(10),
  permissions_on_roles_permission_name = faker.string.alpha(10),
  permissions_on_roles_created_at = new Date(),
  permissions_on_roles_updated_at = new Date(),
} = {}): PermissionOnRolePrisma => {
  return {
    permissions_on_roles_role_name,
    permissions_on_roles_permission_name,
    permissions_on_roles_created_at,
    permissions_on_roles_updated_at,
  };
};
