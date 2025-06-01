import { ConfigurationTypeEnum } from "@prisma/client";

export interface UpdateConfigurationInput {
  key: string;
  clientId: string;
  value?: string;
  type?: ConfigurationTypeEnum;
}

export interface ConfigurationSearchCriteriaInput {
  key: string;
  clientId: string;
  email?: string;
}
