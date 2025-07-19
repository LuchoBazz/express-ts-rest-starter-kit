import {
  AuthTokenStatusEntity,
  AuthTokenStatusResponse,
} from "../../../core/entities/users/auth_token_statuses.entity";

export const presentAuthTokenStatus = (ats: AuthTokenStatusEntity): AuthTokenStatusResponse => {
  return {
    id: ats.getId(),
    email: ats.getEmail(),
    organization_client_id: ats.getOrganizationClientId(),
    issued_at: ats.getIssuedAt(),
    expiration_time: ats.getExpirationTime(),
    ip_address: ats.getIpAddress(),
    user_agent: ats.getUserAgent(),
    revoked: ats.isRevoked(),
    created_at: ats.getCreatedAt(),
    updated_at: ats.getUpdatedAt(),
  };
};

export const presentAuthTokenStatuses = (ats: AuthTokenStatusEntity[]): AuthTokenStatusResponse[] => {
  return ats.map(presentAuthTokenStatus);
};
