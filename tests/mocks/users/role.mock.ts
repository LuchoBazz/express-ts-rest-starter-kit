import { faker } from "@faker-js/faker";

import { RolePrisma } from "../../../src/entities/users/role.enum";

export const genRandomRolePrisma = ({
  role_id = faker.string.uuid(),
  role_name = faker.string.alpha(10),
  role_created_at = new Date(),
  role_updated_at = new Date(),
} = {}): RolePrisma => {
  return {
    role_id,
    role_name,
    role_created_at,
    role_updated_at,
  };
};
