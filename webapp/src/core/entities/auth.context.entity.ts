import type { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: User | null;
}
