import { faker } from "@faker-js/faker";

import { FeatureFlagPrisma } from "../../../src/controllers/entities/organizations/feature_flag.entity";

export const genRandomFeatureFlagPrisma = ({
  feature_flag_id = faker.string.uuid(),
  feature_flag_key = faker.string.alpha(),
  feature_flag_percentage = faker.number.int({ min: 0, max: 100 }),
  feature_flag_is_experimental = false,
  feature_flag_is_active = true,
  feature_flag_organization_client_id = "CLIENT_ID",
  feature_flag_created_at = new Date(),
  feature_flag_updated_at = new Date(),
} = {}): FeatureFlagPrisma => {
  return {
    feature_flag_id,
    feature_flag_key,
    feature_flag_percentage,
    feature_flag_is_experimental,
    feature_flag_is_active,
    feature_flag_organization_client_id,
    feature_flag_created_at,
    feature_flag_updated_at,
  };
};
