"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentConfiguration = void 0;
const presentConfiguration = (config) => {
    return {
        id: config.getId(),
        key: config.getKey(),
        value: config.getValue(),
        type: config.getType(),
        // is_active: config.getIsActive(),
        organization_client_id: config.getClientId(),
    };
};
exports.presentConfiguration = presentConfiguration;
