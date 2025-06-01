import { Entity } from "../entity";

export interface FeatureFlagPrisma {
  feature_flag_id: string;
  feature_flag_key: string;
  feature_flag_value: boolean;
  feature_flag_is_active: boolean;
  feature_flag_organization_client_id: string;
  feature_flag_created_at: Date;
  feature_flag_updated_at: Date;
}

export interface FeatureFlagResponse {
  id: string;
  key: string;
  is_experimental: boolean;
  is_active: boolean;
  organization_client_id: string;
}

export class FeatureFlagEntity extends Entity {
  protected key: string;
  protected value: boolean;
  protected isActive: boolean;
  protected clientId: string;

  constructor(key: string, value: boolean, isActive: boolean, clientId: string) {
    super();
    this.key = key;
    this.value = value;
    this.isActive = isActive;
    this.clientId = clientId;
  }

  public static fromPrisma(payload: FeatureFlagPrisma): FeatureFlagEntity {
    const featureFlag = new FeatureFlagEntity(
      payload.feature_flag_key,
      payload.feature_flag_value,
      payload.feature_flag_is_active,
      payload.feature_flag_organization_client_id,
    );
    featureFlag.setId(payload.feature_flag_id);
    return featureFlag;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public getValue(): boolean {
    return this.value;
  }

  public setValue(value: boolean): void {
    this.value = value;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public setClientId(clientId: string): void {
    this.clientId = clientId;
  }
}
