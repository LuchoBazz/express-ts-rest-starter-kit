import { AuthProvider } from "../../entities/users/a_standard_user.entity";

export interface ConfigManagerSignature {
  findAuthProvider(clientId: string): Promise<AuthProvider>;
}
