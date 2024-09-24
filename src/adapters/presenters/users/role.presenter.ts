import { RoleEntity, RoleResponse } from "../../../core/entities/users/role.enum";

export const presentRole = (role: RoleEntity): RoleResponse => {
  return {
    id: role.getId(),
    name: role.getName(),
  };
};
