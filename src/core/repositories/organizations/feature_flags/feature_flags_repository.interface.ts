import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import {
  FeatureFlagSearchCriteriaInput,
  UpdateFeatureFlagInput,
} from "../../../types/organizations/feature_flag.types";

export interface FeatureFlagRepository {
  findOne(client: unknown, searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity | null>;
  create(client: unknown, featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity>;
  update(client: unknown, featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity>;
  delete(client: unknown, searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity>;
}
