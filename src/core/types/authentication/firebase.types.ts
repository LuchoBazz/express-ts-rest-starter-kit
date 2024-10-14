import admin from "firebase-admin";

export interface FirebaseConfigEnv {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

export type AdminApp = admin.app.App;
export type OrganizationsFirebaseAuthClient = Record<string, AdminApp>;
export type OrganizationsFirebaseAuthEnv = Record<string, FirebaseConfigEnv>;
