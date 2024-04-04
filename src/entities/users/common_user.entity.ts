import { PermissionsValues } from "./authentication.enum";
import { UserRole } from "./role.enum";
import { BaseUserEntity } from "./user_base.entity";

export enum AuthProvider {
  FIREBASE = "FIREBASE",
  SUPABASE = "SUPABASE",
}

export enum AuthType {
  EMAIL_AND_PASSWORD = "EMAIL_AND_PASSWORD",
  FACEBOOK_AUTH = "FACEBOOK_AUTH",
  GOOGLE_AUTH = "GOOGLE_AUTH",
  GITHUB_AUTH = "GITHUB_AUTH",
}

export interface UserPrisma {
  user_id: string;
  user_username: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_identification_number: string | null;
  user_phone_number: string | null;
  user_terms: boolean;
  user_notifications: boolean;
  user_is_active: boolean;
  user_uid: string;
  user_role: UserRole;
  user_auth_provider: AuthProvider;
  user_auth_type: AuthType;
  user_organization_client_id: string;
  user_created_at: Date;
  user_updated_at: Date;
}

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  identificationNumber: string | null;
  phoneNumber: string | null;
  terms: boolean;
  notifications: boolean;
  isActive: boolean;
  uid: string;
  role: UserRole;
  authProvider: AuthProvider;
  authType: AuthType;
  organizationClientId: string;
}

export class CommonUserEntity extends BaseUserEntity {
  protected username: string;
  protected identificationNumber: string | null;
  protected phoneNumber: string | null;
  protected terms: boolean;
  protected notifications: boolean;
  protected isActive: boolean;
  protected uid: string;
  protected authProvider: AuthProvider;
  protected authType: AuthType;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    identificationNumber: string | null,
    phoneNumber: string | null,
    terms: boolean,
    notifications: boolean,
    isActive: boolean,
    uid: string,
    authProvider: AuthProvider,
    authType: AuthType,
    organizationClientId: string,
  ) {
    const role = UserRole.COMMON_USER;
    super(firstName, lastName, email, role, organizationClientId);
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.identificationNumber = identificationNumber;
    this.phoneNumber = phoneNumber;
    this.terms = terms;
    this.notifications = notifications;
    this.isActive = isActive;
    this.uid = uid;
    this.role = role;
    this.authProvider = authProvider;
    this.authType = authType;
  }

  public static fromPrisma(payload: UserPrisma): CommonUserEntity {
    return new CommonUserEntity(
      payload.user_username,
      payload.user_first_name,
      payload.user_last_name,
      payload.user_email,
      payload.user_identification_number,
      payload.user_phone_number,
      payload.user_terms,
      payload.user_notifications,
      payload.user_is_active,
      payload.user_uid,
      payload.user_auth_provider,
      payload.user_auth_type,
      payload.user_organization_client_id,
    );
  }

  public toResponse(): UserResponse {
    return {
      id: this.getId(),
      username: this.getUsername(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      email: this.getEmail(),
      identificationNumber: this.getIdentificationNumber(),
      phoneNumber: this.getPhoneNumber(),
      terms: this.getTerms(),
      notifications: this.getNotifications(),
      isActive: this.getIsActive(),
      uid: this.getUid(),
      role: this.getRole(),
      authProvider: this.getAuthProvider(),
      authType: this.getAuthType(),
      organizationClientId: this.getOrganizationClientId(),
    };
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getIdentificationNumber(): string | null {
    return this.identificationNumber;
  }

  public setIdentificationNumber(identificationNumber: string | null): void {
    this.identificationNumber = identificationNumber;
  }

  public getPhoneNumber(): string | null {
    return this.phoneNumber;
  }

  public setPhoneNumber(phoneNumber: string | null): void {
    this.phoneNumber = phoneNumber;
  }

  public getTerms(): boolean {
    return this.terms;
  }

  public setTerms(terms: boolean): void {
    this.terms = terms;
  }

  public getNotifications(): boolean {
    return this.notifications;
  }

  public setNotifications(notifications: boolean): void {
    this.notifications = notifications;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public getUid(): string {
    return this.uid;
  }

  public setUid(uid: string): void {
    this.uid = uid;
  }

  public getAuthProvider(): AuthProvider {
    return this.authProvider;
  }

  public setAuthProvider(authProvider: AuthProvider): void {
    this.authProvider = authProvider;
  }

  public getAuthType(): AuthType {
    return this.authType;
  }

  public setAuthType(authType: AuthType): void {
    this.authType = authType;
  }

  public getPermissions(): Promise<PermissionsValues[]> {
    return Promise.resolve([PermissionsValues.GUEST_USER]);
  }
}
