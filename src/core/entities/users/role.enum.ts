import { Entity } from "../entity";

export enum UserRole {
  INTERNAL_ADMIN = "INTERNAL_ADMIN",
  EXTERNAL_ADMIN = "EXTERNAL_ADMIN",
  STANDARD_USER = "STANDARD_USER",
  GUEST_USER = "GUEST_USER",
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

  public static fromPrisma(payload: RolePrisma): RoleEntity {
    const role = new RoleEntity(payload.role_name);
    role.setId(payload.role_id);
    return role;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }
}
