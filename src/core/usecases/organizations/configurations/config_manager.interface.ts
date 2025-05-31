import { AuthProvider } from "../../../entities/users/common_user.entity";

export interface ConfigManagerSignature {
  findAuthProvider(clientId: string): Promise<AuthProvider>;
}
