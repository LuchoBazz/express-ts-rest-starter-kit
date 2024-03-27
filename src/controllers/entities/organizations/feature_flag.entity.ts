import { Entity } from "../entity";

export interface FeatureFlagPrisma {
  feature_flag_id: string;
  feature_flag_key: string;
  feature_flag_percentage: number;
  feature_flag_is_experimental: boolean;
  feature_flag_is_active: boolean;
  feature_flag_organization_client_id: string;
  feature_flag_created_at: Date;
  feature_flag_updated_at: Date;
}

export interface FeatureFlagResponse {
  id: string;
  key: string;
  percentage: number;
  is_experimental: boolean;
  is_active: boolean;
  organization_client_id: string;
}

export class FeatureFlagEntity extends Entity {
  protected key: string;
  protected percentage: number;
  protected isExperimental: boolean;
  protected isActive: boolean;
  protected clientId: string;

  constructor(key: string, percentage: number, isExperimental: boolean, isActive: boolean, clientId: string) {
    super();
    this.key = key;
    this.percentage = percentage;
    this.isExperimental = isExperimental;
    this.isActive = isActive;
    this.clientId = clientId;
  }

  public static fromPrisma(payload: FeatureFlagPrisma): FeatureFlagEntity {
    const featureFlag = new FeatureFlagEntity(
      payload.feature_flag_key,
      payload.feature_flag_percentage,
      payload.feature_flag_is_experimental,
      payload.feature_flag_is_active,
      payload.feature_flag_organization_client_id,
    );
    featureFlag.setId(payload.feature_flag_id);
    return featureFlag;
  }

  public toResponse(): FeatureFlagResponse {
    return {
      id: this.getId(),
      key: this.getId(),
      percentage: this.getPercentage(),
      is_experimental: this.getIsExperimental(),
      is_active: this.getIsActive(),
      organization_client_id: this.getClientId(),
    };
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public getPercentage(): number {
    return this.percentage;
  }

  public setPercentage(percentage: number): void {
    this.percentage = percentage;
  }

  public getIsExperimental(): boolean {
    return this.isExperimental;
  }

  public setIsExperimental(isExperimental: boolean): void {
    this.isExperimental = isExperimental;
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
