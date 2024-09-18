import { Entity } from "../entity";

export interface PermissionPrisma {
  permission_id: string;
  permission_name: string;
  permission_created_at: Date;
  permission_updated_at: Date;
}

export interface PermissionResponse {
  id: string;
  name: string;
}

export class PermissionEntity extends Entity {
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
