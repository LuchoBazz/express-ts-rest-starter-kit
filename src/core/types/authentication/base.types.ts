import { JwtDecodedPayload } from "../../entities/users/jwt_user.entity";

export interface ValidateTokenPayload {
  clientId: string;
  accessToken: string;
  email?: string;
}

export interface UserLoggedInPayload {
  clientId: string;
  jwtToken: JwtDecodedPayload | null;
}

export interface DeleteUserPayload {
  clientId: string;
  authId: string;
}

export interface AuthUser {
  authId: string;
  email?: string;
}
