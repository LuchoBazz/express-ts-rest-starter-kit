import { Entity } from "../entity";

export interface OrganizationPrisma {
  organization_id: string;
  organization_name: string;
  organization_client_id: string;
  organization_created_at: Date;
  organization_updated_at: Date;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  client_id: string;
}

export class OrganizationEntity extends Entity {
  protected name: string;
  protected clientId: string;

  constructor(name: string, clientId: string) {
    super();
    this.name = name;
    this.clientId = clientId;
  }

  public static fromPrisma(payload: OrganizationPrisma): OrganizationEntity {
    const organization = new OrganizationEntity(payload.organization_name, payload.organization_client_id);
    organization.setId(payload.organization_id);
    return organization;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public setClientId(clientId: string): void {
    this.clientId = clientId;
  }
}
