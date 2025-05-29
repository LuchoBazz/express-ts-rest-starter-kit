import { ConfigurationEntity } from "../../../entities/organizations/configuration.entity";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../../types/organizations/configuration.types";

export interface ConfigurationRepository {
  findOne(client: unknown, searchCriteria: ConfigurationSearchCriteriaInput): Promise<ConfigurationEntity | null>;
  create(client: unknown, config: ConfigurationEntity): Promise<ConfigurationEntity>;
  update(client: unknown, configuration: UpdateConfigurationInput): Promise<ConfigurationEntity>;
  delete(client: unknown, searchCriteria: ConfigurationSearchCriteriaInput): Promise<ConfigurationEntity>;
}
