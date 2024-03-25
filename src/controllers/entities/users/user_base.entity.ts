import { PermissionsValues } from "./authentication.entity";
import { UserRole } from "./role.entity";

export abstract class BaseUser {
  protected firstName: string;
  protected lastName: string;
  protected email: string;
  protected role: UserRole;

  constructor(firstName: string, lastName: string, email: string, role: UserRole) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
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

  public abstract getPermissions(): Promise<PermissionsValues[]>;
}
