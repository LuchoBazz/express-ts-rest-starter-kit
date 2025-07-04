export interface UpdateAuthTokenStatusesInput {
  id: string;
  clientId: string;
  email: string;
  issuedAt?: Date;
  expirationTime?: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuthTokenStatusesSearchCriteriaInput {
  clientId: string;
  email: string;
  issuedAt?: Date;
}

export interface RevokeSearchCriteriaInput {
  id: string;
  clientId: string;
  email: string;
}
