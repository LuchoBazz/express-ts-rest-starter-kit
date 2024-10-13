export interface ValidateTokenPayload {
  clientId: string;
  accessToken: string;
  email?: string;
}

export interface DeleteUserPayload {
  clientId: string;
  authId: string;
}

export interface AuthUser {
  authId: string;
  email?: string;
}
