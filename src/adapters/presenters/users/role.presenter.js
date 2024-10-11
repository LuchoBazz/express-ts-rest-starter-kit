"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRole = void 0;
const presentRole = (role) => {
    return {
        id: role.getId(),
        name: role.getName(),
    };
};
exports.presentRole = presentRole;
