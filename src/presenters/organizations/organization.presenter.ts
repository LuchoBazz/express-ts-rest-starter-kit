import { OrganizationEntity, OrganizationResponse } from "../../entities/organizations/organization.entity";

export const presentOrganization = (organization: OrganizationEntity): OrganizationResponse => {
  return {
    id: organization.getId(),
    name: organization.getName(),
    client_id: organization.getClientId(),
  };
};
