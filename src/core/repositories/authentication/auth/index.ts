import { AuthProvider } from "../../../entities/users/standard_user.entity";
import { AuthRepository } from "./auth_repository.interface";
import { FirebaseAuthRepository } from "./firebase";
import { SupabaseAuthRepository } from "./supabase";

const authRepositoryMap: Record<AuthProvider, AuthRepository> = {
  [AuthProvider.FIREBASE]: FirebaseAuthRepository,
  [AuthProvider.SUPABASE]: SupabaseAuthRepository,
};

export const getAuthRepository = (target: AuthProvider): AuthRepository => authRepositoryMap[target];
