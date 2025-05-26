import { faker } from "@faker-js/faker";
import { ConfigurationTypeEnum } from "@prisma/client";

import { ConfigurationPrisma } from "../../../src/core/entities/organizations/configuration.entity";

export const genRandomConfigurationPrisma = ({
  configuration_id = faker.string.uuid(),
  configuration_key = faker.string.alpha(),
  configuration_value = faker.string.alpha(),
  configuration_type = "JSON" as ConfigurationTypeEnum,
  configuration_organization_client_id = faker.string.alphanumeric(10),
  configuration_created_at = new Date(),
  configuration_updated_at = new Date(),
} = {}): ConfigurationPrisma => {
  return {
    configuration_id,
    configuration_key,
    configuration_value,
    configuration_type,
    configuration_organization_client_id,
    configuration_created_at,
    configuration_updated_at,
  };
};
