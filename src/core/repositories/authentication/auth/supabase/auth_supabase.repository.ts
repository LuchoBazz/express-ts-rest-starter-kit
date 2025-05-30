import { SupabaseClient } from "@supabase/supabase-js";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../../../adapters/api/errors/unauthorized.error";
import { encodeJSON } from "../../../../shared/utils/encode_json.util";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../../../types/authentication/base.types";
import { OrganizationsSupabaseAuthEnv } from "../../../../types/authentication/supabase.types";
import { AuthRepository } from "../auth_repository.interface";
import { SupabaseClientManager } from "./supabase_client_manager.config";

const supabaseConfig = encodeJSON<OrganizationsSupabaseAuthEnv>(process.env.SUPABASE_CREDENTIALS || "{}", {});
const manager = SupabaseClientManager.getInstance(supabaseConfig);

export const SupabaseAuthRepository: AuthRepository = {
  async validateToken(payload: ValidateTokenPayload): Promise<AuthUser> {
    try {
      const { clientId, accessToken } = payload;
      const supabase: SupabaseClient = manager.getClient(clientId);
      const { data } = await supabase.auth.getUser(accessToken);
      const { user } = data;
      if (!user) {
        throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
      }
      return { authId: user.id, email: user.email };
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
    }
  },
  async deleteUser(payload: DeleteUserPayload): Promise<boolean> {
    try {
      const { clientId, authId } = payload;
      const supabase: SupabaseClient = manager.getClient(clientId);
      const { error } = await supabase.auth.admin.deleteUser(authId);
      return !error;
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.DELETING_USER_ERROR);
    }
  },
};
