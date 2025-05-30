import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../../types/authentication/base.types";

export interface AuthRepository {
  validateToken(payload: ValidateTokenPayload): Promise<AuthUser>;
  deleteUser(payload: DeleteUserPayload): Promise<boolean>;
}
