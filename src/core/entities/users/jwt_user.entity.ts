export interface JwtUserPayload {
  id: string;
  auth_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  client_id: string;
  role: string;
  auth_provider: string;
  auth_type: string;
}

export interface JwtDecodedPayload {
  user: JwtUserPayload;
  iat: number;
  iss: string;
  aud: string[];
}

export interface JwtPayload {
  serialized_user: string;
  iat: number;
  iss: string;
  aud: string[];
}
