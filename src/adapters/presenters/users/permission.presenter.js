"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentPermission = void 0;
const presentPermission = (permission) => {
    return {
        id: permission.getId(),
        name: permission.getName(),
    };
};
exports.presentPermission = presentPermission;
