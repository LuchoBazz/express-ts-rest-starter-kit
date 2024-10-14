import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../types/authentication/base.types";

export abstract class BaseAuthService {
  public abstract validateToken(payload: ValidateTokenPayload): Promise<AuthUser>;
  public abstract deleteUser(payload: DeleteUserPayload): Promise<boolean>;
}
