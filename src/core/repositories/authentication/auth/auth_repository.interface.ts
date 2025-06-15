import { JwtUserPayload } from "../../../entities/users/jwt_user.entity";
import {
  AuthUser,
  DeleteUserPayload,
  UserLoggedInPayload,
  ValidateTokenPayload,
} from "../../../types/authentication/base.types";

export interface AuthRepository {
  validateToken(payload: ValidateTokenPayload): Promise<AuthUser>;
  deleteUser(payload: DeleteUserPayload): Promise<boolean>;
  userLoggedIn(payload: UserLoggedInPayload): Promise<JwtUserPayload>;
}
