import { Entity } from "../entity";
import { PermissionsValues } from "./authentication.enum";
import { UserRole } from "./role.enum";

export interface BaseUserPrisma {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_role: UserRole;
  user_organization_client_id: string;
  user_created_at: Date;
  user_updated_at: Date;
}

export interface UserBaseResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  clientId: string;
}

export abstract class BaseUserEntity extends Entity {
  protected firstName: string;
  protected lastName: string;
  protected email: string;
  protected role: UserRole;
  protected clientId: string;

  constructor(firstName: string, lastName: string, email: string, role: UserRole, clientId: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.clientId = clientId;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public setRole(role: UserRole): void {
    this.role = role;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public setClientId(organizationClientId: string): void {
    this.clientId = organizationClientId;
  }

  public abstract getPermissions(): Promise<PermissionsValues[]>;
}
