import { SupabaseClient } from "@supabase/supabase-js";

import { SupabaseConfigEnv } from "../../services/authentication/supabase_config.service";

export type OrganizationsSupabaseAuthEnv = Record<string, SupabaseConfigEnv>;
export type OrganizationsSupabaseAuthClient = Record<string, SupabaseClient>;
