import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { ErrorMessage } from "../../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../adapters/api/errors/not_found.error";
import {
  OrganizationsSupabaseAuthClient,
  OrganizationsSupabaseAuthEnv,
} from "../../../types/authentication/supabase.types";

export class SupabaseClientManager {
  private static instance: SupabaseClientManager;
  private clients: OrganizationsSupabaseAuthClient = {};

  private constructor(config: OrganizationsSupabaseAuthEnv) {
    this.initializeClients(config);
  }

  public static getInstance(config: OrganizationsSupabaseAuthEnv): SupabaseClientManager {
    if (!SupabaseClientManager.instance) {
      SupabaseClientManager.instance = new SupabaseClientManager(config);
    }
    return SupabaseClientManager.instance;
  }

  private initializeClients(config: OrganizationsSupabaseAuthEnv): void {
    Object.keys(config).forEach((clientId: string) => {
      const { url: supabaseUrl, key: supabaseKey } = config[clientId];
      this.clients[clientId] = createClient(supabaseUrl, supabaseKey);
    });
  }

  public getClient(clientId: string): SupabaseClient {
    const supabaseClient = this.clients[clientId];
    if (!supabaseClient) {
      throw new NotFoundError(ErrorMessage.SUPABASE_CONFIGURATION_NOT_FOUND);
    }
    return supabaseClient;
  }
}
