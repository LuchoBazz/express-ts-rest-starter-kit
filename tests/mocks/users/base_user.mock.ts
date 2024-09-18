import { faker } from "@faker-js/faker";

import { UserRole } from "../../../src/entities/users/role.enum";
import { BaseUserPrisma } from "../../../src/entities/users/user_base.entity";

export const genRandomBaseUserPrisma = ({
  user_id = faker.string.uuid(),
  user_first_name = faker.person.firstName(),
  user_last_name = faker.person.lastName(),
  user_email = faker.internet.email(),
  user_role = UserRole.COMMON_USER,
  user_organization_client_id = "CLIENT_ID",
  user_created_at = new Date(),
  user_updated_at = new Date(),
} = {}): BaseUserPrisma => {
  return {
    user_id,
    user_first_name,
    user_last_name,
    user_email,
    user_role,
    user_organization_client_id,
    user_created_at,
    user_updated_at,
  };
};
