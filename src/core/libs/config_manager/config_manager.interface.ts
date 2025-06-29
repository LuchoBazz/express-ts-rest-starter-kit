import { AuthProvider } from "../../entities/users/standard_user.entity";

export interface ConfigManagerSignature {
  findAuthProvider(clientId: string): Promise<AuthProvider>;
}
