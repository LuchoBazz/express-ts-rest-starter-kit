import { faker } from "@faker-js/faker";

import { PermissionPrisma } from "../../../src/core/entities/users/permission.entity";

export const genRandomPermissionPrisma = ({
  permission_id = faker.string.uuid(),
  permission_name = faker.string.alpha(10),
  permission_created_at = new Date(),
  permission_updated_at = new Date(),
} = {}): PermissionPrisma => {
  return {
    permission_id,
    permission_name,
    permission_created_at,
    permission_updated_at,
  };
};
