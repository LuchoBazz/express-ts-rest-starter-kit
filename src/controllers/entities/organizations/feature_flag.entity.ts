export class FeatureFlagEntity {
  protected key: string;
  protected percentage: number;
  protected isExperimental: boolean;
  protected isActive: boolean;
  protected clientId: string;

  constructor(key: string, percentage: number, isExperimental: boolean, isActive: boolean, clientId: string) {
    this.key = key;
    this.percentage = percentage;
    this.isExperimental = isExperimental;
    this.isActive = isActive;
    this.clientId = clientId;
  }

  public static fromPrisma(payload: any): FeatureFlagEntity {
    return new FeatureFlagEntity(
      payload.feature_flag_key as string,
      payload.feature_flag_percentage as number,
      payload.feature_flag_is_experimental as boolean,
      payload.feature_flag_is_active as boolean,
      payload.feature_flag_organization_client_id as string,
    );
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
