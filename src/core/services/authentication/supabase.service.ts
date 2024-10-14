import { SupabaseClient } from "@supabase/supabase-js";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../types/authentication/base.types";
import { OrganizationsSupabaseAuthEnv } from "../../types/authentication/supabase.types";
import { BaseAuthService } from "./base_auth.service";
import { SupabaseClientManager } from "./supabase_config.service";

export class SupabaseAuthService extends BaseAuthService {
  public supabaseManager: SupabaseClientManager;

  constructor() {
    super();
    const supabaseConfig = JSON.parse(process.env.SUPABASE_CONFIG || "{}") as OrganizationsSupabaseAuthEnv;
    this.supabaseManager = SupabaseClientManager.getInstance(supabaseConfig);
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<AuthUser> {
    try {
      const supabase: SupabaseClient = this.supabaseManager.getClient(clientId);
      const { data } = await supabase.auth.getUser(accessToken);
      const { user } = data;
      if (!user) {
        throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
      }
      return { authId: user.id, email: user.email };
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
    }
  }

  public async deleteUser({ clientId, authId }: DeleteUserPayload): Promise<boolean> {
    try {
      const supabase: SupabaseClient = this.supabaseManager.getClient(clientId);
      const { error } = await supabase.auth.admin.deleteUser(authId);
      return !error;
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.DELETING_USER_ERROR);
    }
  }
}
