import { PermissionEntity } from "../../../entities/users/permission.entity";

export interface PermissionRepository {
  findOne(client: unknown, name: string): Promise<PermissionEntity | null>;
  create(client: unknown, permission: PermissionEntity): Promise<PermissionEntity>;
  delete(client: unknown, name: string): Promise<PermissionEntity>;
}
