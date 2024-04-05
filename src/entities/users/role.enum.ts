import { Entity } from "../entity";

export enum UserRole {
  INTERNAL_ADMIN = "INTERNAL_ADMIN",
  EXTERNAL_ADMIN = "EXTERNAL_ADMIN",
  COMMON_USER = "COMMON_USER",
}

export interface RolePrisma {
  role_id: string;
  role_name: string;
  role_created_at: Date;
  role_updated_at: Date;
}

export interface RoleResponse {
  id: string;
  name: string;
}

export class RoleEntity extends Entity {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }
}
