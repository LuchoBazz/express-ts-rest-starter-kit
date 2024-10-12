"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentUserBase = void 0;
const presentUserBase = (baseUser) => {
    return {
        id: baseUser.getId(),
        firstName: baseUser.getFirstName(),
        lastName: baseUser.getLastName(),
        email: baseUser.getEmail(),
        role: baseUser.getRole(),
        clientId: baseUser.getClientId(),
    };
};
exports.presentUserBase = presentUserBase;
