import { SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConfigEnv {
  url: string;
  key: string;
}

export type OrganizationsSupabaseAuthEnv = Record<string, SupabaseConfigEnv>;
export type OrganizationsSupabaseAuthClient = Record<string, SupabaseClient>;
