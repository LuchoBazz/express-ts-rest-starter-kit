import { BaseUserEntity, UserBaseResponse } from "../../../core/entities/users/user_base.entity";

export const presentUserBase = (baseUser: BaseUserEntity): UserBaseResponse => {
  return {
    id: baseUser.getId(),
    firstName: baseUser.getFirstName(),
    lastName: baseUser.getLastName(),
    email: baseUser.getEmail(),
    role: baseUser.getRole(),
    clientId: baseUser.getClientId(),
  };
};
