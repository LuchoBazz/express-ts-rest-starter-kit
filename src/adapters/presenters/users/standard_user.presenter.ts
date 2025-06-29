import { StandardUserEntity, UserResponse } from "../../../core/entities/users/a_standard_user.entity";
import { presentUserBase } from "./user_base.presenter";

export const presentStandardUser = (standardUser: StandardUserEntity): UserResponse => {
  return {
    ...presentUserBase(standardUser),
    username: standardUser.getUsername(),
    identificationNumber: standardUser.getIdentificationNumber(),
    phoneNumber: standardUser.getPhoneNumber(),
    terms: standardUser.getTerms(),
    notifications: standardUser.getNotifications(),
    isActive: standardUser.getIsActive(),
    uid: standardUser.getUid(),
    authProvider: standardUser.getAuthProvider(),
    authType: standardUser.getAuthType(),
  };
};
