import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { OrganizationsSupabaseAuthClient, OrganizationsSupabaseAuthEnv } from "../../types/authentication/supabase.types";

export interface SupabaseConfigEnv {
  url: string;
  key: string;
}

export const createSupabaseClients = (config: OrganizationsSupabaseAuthEnv): OrganizationsSupabaseAuthClient => {
  const clients: OrganizationsSupabaseAuthClient = {};

  Object.keys(config).forEach((clientId: string) => {
    const { url: supabaseUrl, key: supabaseKey } = config[clientId];
    clients[clientId] = createClient(supabaseUrl, supabaseKey);
  });

  return clients;
};

export const getSupabaseApp = (
  clients: OrganizationsSupabaseAuthClient,
  clientId: string,
): SupabaseClient => {
  const supabaseClient = clients[clientId];
  if(!supabaseClient) {
    throw new NotFoundError(ErrorMessage.SUPABASE_CONFIGURATION_NOT_FOUND);
  }
  return supabaseClient;
};
