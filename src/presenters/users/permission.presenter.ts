import { PermissionEntity, PermissionResponse } from "../../entities/users/permission.entity";

export const presentPermission = (permission: PermissionEntity): PermissionResponse => {
  return {
    id: permission.getId(),
    name: permission.getName(),
  };
};
