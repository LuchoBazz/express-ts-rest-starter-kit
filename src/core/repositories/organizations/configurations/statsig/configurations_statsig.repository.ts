import { ConfigurationTypeEnum } from "@prisma/client";
import { StatsigUser } from "@statsig/statsig-node-core";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { statsig } from "../../../../../infrastructure/configurations/statsig";
import { ConfigurationEntity } from "../../../../entities/organizations/configuration.entity";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../../../types/organizations/configuration.types";
import { ConfigurationRepository } from "../configurations_repository.interface";

export const StatSigConfigurationRepository: ConfigurationRepository = {
  findOne(_client: unknown, searchCriteria: ConfigurationSearchCriteriaInput): Promise<ConfigurationEntity | null> {
    const { key, clientId, email } = searchCriteria;
    const statsigUser = new StatsigUser({ userID: clientId, email });
    const config = statsig.getDynamicConfig(statsigUser, key);
    if (!config.value) {
      return Promise.resolve(null);
    }
    return Promise.resolve(
      new ConfigurationEntity(key, JSON.stringify(config.value), ConfigurationTypeEnum.JSON, true, clientId),
    );
  },
  create(_client: unknown, _config: ConfigurationEntity): Promise<ConfigurationEntity> {
    throw new Error(ErrorMessage.YOU_CANNOT_CREATE_CONFIGURATIONS);
  },
  update(_client: unknown, _configuration: UpdateConfigurationInput): Promise<ConfigurationEntity> {
    throw new Error(ErrorMessage.CONFIGURATIONS_MUST_BE_MANAGED_VIA_THE_STATSIG_CONSOLE);
  },
  delete(_client: unknown, _searchCriteria: ConfigurationSearchCriteriaInput): Promise<ConfigurationEntity> {
    throw new Error(ErrorMessage.DELETING_CONFIGURATIONS_IS_NOT_SUPPORTED_BY_THE_STATSIG_SDK);
  },
};
