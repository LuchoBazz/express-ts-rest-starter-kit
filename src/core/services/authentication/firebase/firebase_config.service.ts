import admin, { AppOptions } from "firebase-admin";

import { ErrorMessage } from "../../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../adapters/api/errors/not_found.error";
import {
  AdminApp,
  OrganizationsFirebaseAuthClient,
  OrganizationsFirebaseAuthEnv,
} from "../../../types/authentication/firebase.types";

export class FirebaseClientManager {
  private static instance: FirebaseClientManager;
  private clients: OrganizationsFirebaseAuthClient = {};

  private constructor(config: OrganizationsFirebaseAuthEnv) {
    this.initializeClients(config);
  }

  public static getInstance(config: OrganizationsFirebaseAuthEnv): FirebaseClientManager {
    if (!FirebaseClientManager.instance) {
      FirebaseClientManager.instance = new FirebaseClientManager(config);
    }
    return FirebaseClientManager.instance;
  }

  private initializeClients(config: OrganizationsFirebaseAuthEnv): void {
    const organizations: string[] = Object.keys(config);

    for (const client_id of organizations) {
      const credential = admin.credential.cert(config[client_id]);
      const credentials: AppOptions = { credential };
      this.clients[client_id] = admin.initializeApp(credentials, client_id);
    }
  }

  public getClient(clientId: string): AdminApp {
    const supabaseClient = this.clients[clientId];
    if (!supabaseClient) {
      throw new NotFoundError(ErrorMessage.SUPABASE_CONFIGURATION_NOT_FOUND);
    }
    return supabaseClient;
  }
}
