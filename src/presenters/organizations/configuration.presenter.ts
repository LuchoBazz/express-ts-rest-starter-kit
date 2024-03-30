import { ConfigurationEntity, ConfigurationResponse } from "../../entities/organizations/configuration.entity";

export const presentConfiguration = (config: ConfigurationEntity): ConfigurationResponse => {
  return {
    id: config.getId(),
    key: config.getKey(),
    value: config.getValue(),
    type: config.getType(),
    // is_active: config.getIsActive(),
    organization_client_id: config.getClientId(),
  };
};
