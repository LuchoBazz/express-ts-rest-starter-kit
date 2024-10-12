"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPermissionsToRoleController = exports.findPermissionsByRoleController = void 0;
const permission_on_role_interactor_1 = require("../../../../core/interactors/users/permission_on_role.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const permission_presenter_1 = require("../../../presenters/users/permission.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findPermissionsByRoleController = [
    (0, validator_1.validateSchema)(schemas_1.permissionOnRoleSchema),
    async (request, response, next) => {
        try {
            const { role_name } = request.params;
            const permissionsFound = await (0, permission_on_role_interactor_1.findPermissionsByRoleInteractor)(role_name);
            const responsePermissions = permissionsFound.map(permission_presenter_1.presentPermission);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePermissions });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.addPermissionsToRoleController = [
    (0, validator_1.validateSchema)(schemas_1.addPermissionsToRoleSchema),
    async (request, response, next) => {
        try {
            const { role_name, permissions } = request.body;
            const permissionsFound = await (0, permission_on_role_interactor_1.addPermissionsToRoleInteractor)(role_name, permissions);
            const responsePermissions = permissionsFound.map(permission_presenter_1.presentPermission);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePermissions });
        }
        catch (error) {
            next(error);
        }
    },
];
