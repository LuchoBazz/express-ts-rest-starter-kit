import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { getPermissionOnRoleRepository } from "../../repositories/users/permissions_on_roles";
import { getUserRepository } from "../../repositories/users/users";
import { PermissionsValues } from "./authentication.enum";
import { PermissionEntity } from "./permission.entity";
import { UserRole } from "./role.enum";
import { BaseUserEntity } from "./user_base.entity";

export class InternalAdminUserEntity extends BaseUserEntity {
  constructor(firstName: string, lastName: string, email: string, clientId: string) {
    super(firstName, lastName, email, UserRole.INTERNAL_ADMIN, clientId);
  }

  public getPermissions(): Promise<PermissionsValues[]> {
    const userRepository = getUserRepository();
    const permissionOnRoleRepository = getPermissionOnRoleRepository();

    return onSession(async (client: PrismaClient) => {
      const user = await userRepository.findOne(client, this.email);
      if (!user) {
        throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
      }
      const permissions = await permissionOnRoleRepository.findByRole(client, user.getRole());
      return permissions.map((permission: PermissionEntity) => permission.getName() as PermissionsValues);
    });
  }
}
