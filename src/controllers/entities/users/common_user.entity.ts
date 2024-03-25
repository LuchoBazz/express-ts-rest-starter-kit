import { PermissionsValues } from "./authentication.entity";
import { UserRole } from "./role.entity";
import { BaseUser } from "./user_base.entity";

export class CommonUser extends BaseUser {
  constructor(firstName: string, lastName: string, email: string) {
    super(firstName, lastName, email, UserRole.COMMON_USER);
  }

  public getPermissions(): Promise<PermissionsValues[]> {
    // TODO: Get permissions from DB
    return Promise.resolve([PermissionsValues.GUEST_USER]);
  }
}
