import { UserRole } from "./role.enum";
import { BaseUserEntity } from "./user_base.entity";

export class GuestUserEntity extends BaseUserEntity {
  constructor(clientId: string) {
    super("Guest first name", "Guest last name", "guest@guest.com", UserRole.GUEST_USER, clientId);
  }
}
