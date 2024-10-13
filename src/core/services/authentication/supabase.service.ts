import { SupabaseClient } from "@supabase/supabase-js";

import { UnauthorizedError } from "../../../adapters/api/errors/unauthorized.error";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../types/authentication/base.types";
import { BaseAuthService } from "./base_auth.service";
import { createSupabaseClients, getSupabaseApp } from "./supabase_config.service";
import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { OrganizationsSupabaseAuthClient } from "../../types/authentication/supabase.types";

export class SupabaseAuthService extends BaseAuthService {
  public config: OrganizationsSupabaseAuthClient;

  constructor() {
    super();
    this.config = createSupabaseClients(process.env.SUPABASE_CONFIG as any);
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<AuthUser> {
    try {
      const supabase: SupabaseClient = await getSupabaseApp(this.config, clientId);
      const { data } = await supabase.auth.getUser(accessToken);
      const { user } = data;
      if(!user) {
        throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
      }
      return { authId: user.id, email: user.email };
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
    }
  }

  public async deleteUser({ clientId, authId }: DeleteUserPayload): Promise<boolean> {
    try {
      const supabase: SupabaseClient = await getSupabaseApp(this.config, clientId);
      const { error } = await supabase.auth.admin.deleteUser(authId);
      return !error;
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.DELETING_USER_ERROR);
    }
  }
}
