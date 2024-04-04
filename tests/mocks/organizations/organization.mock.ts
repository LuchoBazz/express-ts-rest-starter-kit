import { faker } from "@faker-js/faker";

import { OrganizationPrisma } from "../../../src/entities/organizations/organization.entity";

export const genRandomOrganizationPrisma = ({
  organization_id = faker.string.uuid(),
  organization_name = faker.company.name(),
  organization_client_id = "CLIENT_ID",
  organization_created_at = new Date(),
  organization_updated_at = new Date(),
} = {}): OrganizationPrisma => {
  return {
    organization_id,
    organization_name,
    organization_client_id,
    organization_created_at,
    organization_updated_at,
  };
};
