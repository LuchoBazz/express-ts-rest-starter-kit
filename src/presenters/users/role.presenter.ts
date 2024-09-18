import { RoleEntity, RoleResponse } from "../../entities/users/role.enum";

export const presentRole = (role: RoleEntity): RoleResponse => {
  return {
    id: role.getId(),
    name: role.getName(),
  };
};
