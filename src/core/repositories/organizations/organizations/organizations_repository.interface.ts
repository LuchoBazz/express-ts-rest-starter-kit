import { OrganizationEntity } from "../../../entities/organizations/organization.entity";
import { UpdateOrganizationInput } from "../../../types/organizations/organization.types";

export interface OrganizationRepository {
  findOne(client: unknown, clientId: string): Promise<OrganizationEntity | null>;
  create(client: unknown, organization: OrganizationEntity): Promise<OrganizationEntity>;
  update(client: unknown, organization: UpdateOrganizationInput): Promise<OrganizationEntity>;
  delete(client: unknown, clientId: string): Promise<OrganizationEntity>;
}
