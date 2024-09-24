export abstract class CacheParameters {
  public abstract generateKey(): string;
  public abstract getSearchValues(): string[];
}

export class OrganizationCacheParameters extends CacheParameters {
  private clientId: string;
  private paramKey: string;

  public constructor(clientId: string, paramKey: string) {
    super();
    this.clientId = clientId;
    this.paramKey = paramKey;
  }

  public generateKey(): string {
    return `${this.getClientId()}-${this.getParamKey()}`;
  }

  public getSearchValues(): string[] {
    return [this.getClientId(), this.getParamKey()];
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getParamKey(): string {
    return this.paramKey;
  }
}
