import { PrismaClient } from "@prisma/client";

import { AuthProvider } from "../../entities/users/common_user.entity";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../types/authentication/base.types";
import { BaseAuthService } from "./base_auth.service";
import { FirebaseAuthService } from "./firebase/firebase.service";
import { SupabaseAuthService } from "./supabase/supabase.service";

export class AuthGatewayService {
  private providers!: Record<AuthProvider, BaseAuthService>;
  private static instance: AuthGatewayService;

  private constructor() {
    if (AuthGatewayService.instance) {
      return AuthGatewayService.instance;
    }

    this.providers = {
      [AuthProvider.FIREBASE]: new FirebaseAuthService(),
      [AuthProvider.SUPABASE]: new SupabaseAuthService(),
    };

    AuthGatewayService.instance = this;
    return AuthGatewayService.instance;
  }

  private async getAuthService(_client: PrismaClient, _clientId: string): Promise<BaseAuthService> {
    // const authProvider = await findConfigurationService(client, { key: "", clientId });
    // if(!authProvider) {
    //   throw new NotFoundError("");
    // }
    // return this.providers[ authProvider.getValue() as AuthProvider];
    return Promise.resolve(this.providers[AuthProvider.FIREBASE]);
  }

  public async validateToken(client: PrismaClient, payload: ValidateTokenPayload): Promise<AuthUser | null> {
    const { email, clientId } = payload;
    const authService = await this.getAuthService(client, clientId);
    const user = await authService.validateToken(payload);
    const isValidUser = user && !(!user.authId || (email && user.email !== email));
    return isValidUser ? user : null;
  }

  public async deleteUser(client: PrismaClient, payload: DeleteUserPayload): Promise<boolean> {
    const { clientId } = payload;
    const authService = await this.getAuthService(client, clientId);
    return authService.deleteUser(payload);
  }
}
