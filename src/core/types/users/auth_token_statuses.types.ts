export interface UpdateAuthTokenStatusesInput {
  clientId: string;
  authTokenStatusId: string;
  issuedAt?: number;
  expirationTime?: number;
}

export interface AuthTokenStatusesSearchCriteriaInput {
  clientId: string;
  userId: string;
  issuedAt?: number;
}
