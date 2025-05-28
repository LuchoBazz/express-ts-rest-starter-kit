import { RoleEntity } from "../../../entities/users/role.enum";

export interface RoleRepository {
  findOne(client: unknown, name: string): Promise<RoleEntity | null>;
  create(client: unknown, role: RoleEntity): Promise<RoleEntity>;
  delete(client: unknown, name: string): Promise<RoleEntity>;
}
