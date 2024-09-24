import { UserRole } from "../users/role.enum";

export abstract class CachePermissions {
  public abstract generateKey(): string;
  public abstract getSearchValues(): string[];
}

export class RoleCachePermissions extends CachePermissions {
  private role: UserRole;

  public constructor(role: UserRole) {
    super();
    this.role = role;
  }

  public generateKey(): string {
    return `${this.getRole()}`;
  }

  public getSearchValues(): string[] {
    return [this.getRole()];
  }

  public getRole(): string {
    return this.role;
  }
}
