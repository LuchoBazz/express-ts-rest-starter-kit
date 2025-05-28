import { PermissionEntity } from "../../../entities/users/permission.entity";

export interface PermissionOnRoleRepository {
  findByRole(client: unknown, role: string): Promise<PermissionEntity[]>;
  addPermissionToRole(client: unknown, role: string, permissions: string[]): Promise<PermissionEntity[]>;
}
