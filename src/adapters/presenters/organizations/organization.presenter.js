"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentOrganization = void 0;
const presentOrganization = (organization) => {
    return {
        id: organization.getId(),
        name: organization.getName(),
        client_id: organization.getClientId(),
    };
};
exports.presentOrganization = presentOrganization;
