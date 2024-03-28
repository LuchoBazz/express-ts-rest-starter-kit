import { ConfigurationTypeEnum } from "@prisma/client";

import { Entity } from "../entity";

export interface ConfigurationPrisma {
  configuration_id: string;
  configuration_key: string;
  configuration_value: string;
  configuration_type: ConfigurationTypeEnum;
  // feature_flag_is_active: boolean;
  configuration_organization_client_id: string;
  configuration_created_at: Date;
  configuration_updated_at: Date;
}

export interface ConfigurationResponse {
  id: string;
  key: string;
  value: string;
  type: ConfigurationTypeEnum;
  // is_active: boolean;
  organization_client_id: string;
}

export class ConfigurationEntity extends Entity {
  protected key: string;
  protected value: string;
  protected type: ConfigurationTypeEnum;
  protected clientId: string;

  constructor(key: string, value: string, type: ConfigurationTypeEnum, clientId: string) {
    super();
    this.key = key;
    this.value = value;
    this.type = type;
    this.clientId = clientId;
  }

  public static fromPrisma(payload: ConfigurationPrisma): ConfigurationEntity {
    const config = new ConfigurationEntity(
      payload.configuration_key,
      payload.configuration_value,
      payload.configuration_type,
      payload.configuration_organization_client_id,
    );
    config.setId(payload.configuration_id);
    return config;
  }

  public toResponse(): ConfigurationResponse {
    return {
      id: this.getId(),
      key: this.getKey(),
      value: this.getValue(),
      type: this.getType(),
      organization_client_id: this.getClientId(),
    };
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getType(): ConfigurationTypeEnum {
    return this.type;
  }

  public setType(type: ConfigurationTypeEnum): void {
    this.type = type;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public setClientId(clientId: string): void {
    this.clientId = clientId;
  }
}
