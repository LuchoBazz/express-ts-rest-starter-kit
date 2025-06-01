import { StatsigUser } from "@statsig/statsig-node-core";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { statsig } from "../../../../../infrastructure/configurations/statsig";
import { FeatureFlagEntity } from "../../../../entities/organizations/feature_flag.entity";
import {
  FeatureFlagSearchCriteriaInput,
  UpdateFeatureFlagInput,
} from "../../../../types/organizations/feature_flag.types";
import { FeatureFlagRepository } from "../feature_flags_repository.interface";

export const StatSigFeatureFlagRepository: FeatureFlagRepository = {
  async findOne(_client: unknown, searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity | null> {
    const { key, clientId } = searchCriteria;
    const statsigUser = new StatsigUser({ userID: clientId });
    const value = statsig.checkGate(statsigUser, key);
    return Promise.resolve(new FeatureFlagEntity(key, value, true, clientId));
  },
  create(_client: unknown, _featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> {
    throw new Error(ErrorMessage.YOU_CANNOT_CREATE_CONFIGURATIONS);
  },
  update(_client: unknown, _featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity> {
    throw new Error(ErrorMessage.CONFIGURATIONS_MUST_BE_MANAGED_VIA_THE_STATSIG_CONSOLE);
  },
  delete(_client: unknown, _searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity> {
    throw new Error(ErrorMessage.DELETING_CONFIGURATIONS_IS_NOT_SUPPORTED_BY_THE_STATSIG_SDK);
  },
};
