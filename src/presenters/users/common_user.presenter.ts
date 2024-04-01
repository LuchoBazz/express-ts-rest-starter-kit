import { CommonUserEntity, UserResponse } from "../../entities/users/common_user.entity";

export const presentCommonUser = (commonUser: CommonUserEntity): UserResponse => {
  return {
    id: commonUser.getId(),
    username: commonUser.getUsername(),
    firstName: commonUser.getFirstName(),
    lastName: commonUser.getLastName(),
    email: commonUser.getEmail(),
    identificationNumber: commonUser.getIdentificationNumber(),
    phoneNumber: commonUser.getPhoneNumber(),
    terms: commonUser.getTerms(),
    notifications: commonUser.getNotifications(),
    isActive: commonUser.getIsActive(),
    uid: commonUser.getUid(),
    role: commonUser.getRole(),
    authProvider: commonUser.getAuthProvider(),
    authType: commonUser.getAuthType(),
    organizationClientId: commonUser.getOrganizationClientId(),
  };
};
