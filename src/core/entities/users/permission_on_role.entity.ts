import { Entity } from "../entity";

export interface PermissionOnRolePrisma {
  permissions_on_roles_role_name: string;
  permissions_on_roles_permission_name: string;
  permissions_on_roles_created_at: Date;
  permissions_on_roles_updated_at: Date;
}

export interface PermissionResponse {
  id: string;
  name: string;
}

export class PermissionOnRoleEntity extends Entity {
  private roleName: string;
  private permissionName: string;

  constructor(roleName: string, permissionName: string) {
    super();
    this.roleName = roleName;
    this.permissionName = permissionName;
  }

  public static fromPrisma(payload: PermissionOnRolePrisma): PermissionOnRoleEntity {
    const role = new PermissionOnRoleEntity(
      payload.permissions_on_roles_role_name,
      payload.permissions_on_roles_permission_name,
    );
    role.setId(payload.permissions_on_roles_role_name + "-" + payload.permissions_on_roles_permission_name);
    return role;
  }

  public getRoleName(): string {
    return this.roleName;
  }

  public setRoleName(value: string) {
    this.roleName = value;
  }

  public getPermissionName(): string {
    return this.permissionName;
  }

  public setPermissionName(value: string) {
    this.permissionName = value;
  }
}
