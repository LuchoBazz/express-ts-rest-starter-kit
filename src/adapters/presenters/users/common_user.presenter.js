"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentCommonUser = void 0;
const user_base_presenter_1 = require("./user_base.presenter");
const presentCommonUser = (commonUser) => {
    return {
        ...(0, user_base_presenter_1.presentUserBase)(commonUser),
        username: commonUser.getUsername(),
        identificationNumber: commonUser.getIdentificationNumber(),
        phoneNumber: commonUser.getPhoneNumber(),
        terms: commonUser.getTerms(),
        notifications: commonUser.getNotifications(),
        isActive: commonUser.getIsActive(),
        uid: commonUser.getUid(),
        authProvider: commonUser.getAuthProvider(),
        authType: commonUser.getAuthType(),
    };
};
exports.presentCommonUser = presentCommonUser;
