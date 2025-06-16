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
  sub: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string[];
}

export interface JwtAuthPayload {
  serialized_user: string;
  sub: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string[];
}
