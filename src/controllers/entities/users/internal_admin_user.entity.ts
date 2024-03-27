import { PermissionsValues } from "./authentication.enum";
import { UserRole } from "./role.enum";
import { BaseUserEntity } from "./user_base.entity";

export class InternalAdminUserEntity extends BaseUserEntity {
  constructor(firstName: string, lastName: string, email: string) {
    super(firstName, lastName, email, UserRole.INTERNAL_ADMIN);
  }

  public getPermissions(): Promise<PermissionsValues[]> {
    // TODO: Get permissions from DB
    return Promise.resolve([PermissionsValues.GUEST_USER]);
  }
}
