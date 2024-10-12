"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionChecker = void 0;
const authentication_enum_1 = require("../../../core/entities/users/authentication.enum");
const errors_enum_1 = require("../errors/errors.enum");
const unauthorized_error_1 = require("../errors/unauthorized.error");
const permissionChecker = (requiredPermissions) => {
    return (_request, _, next) => {
        // request.user.getPermissions()
        const userPermissions = [authentication_enum_1.PermissionsValues.GUEST_USER];
        const hasRequiredPermissions = requiredPermissions.every((permission) => {
            return userPermissions.includes(permission);
        });
        if (hasRequiredPermissions) {
            return next();
        }
        const error = new unauthorized_error_1.UnauthorizedError(errors_enum_1.ErrorMessage.INSUFFICIENT_ACCESS_PERMISSIONS, []);
        return next(error);
    };
};
exports.permissionChecker = permissionChecker;
