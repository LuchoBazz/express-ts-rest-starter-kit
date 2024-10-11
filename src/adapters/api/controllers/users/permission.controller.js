"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleController = exports.createRoleController = exports.findRoleController = void 0;
const permission_entity_1 = require("../../../../core/entities/users/permission.entity");
const permission_interactor_1 = require("../../../../core/interactors/users/permission/permission.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const permission_presenter_1 = require("../../../presenters/users/permission.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findRoleController = [
    (0, validator_1.validateSchema)(schemas_1.permissionSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const permissionFound = await (0, permission_interactor_1.findPermissionInteractor)(name);
            const responsePermission = (0, permission_presenter_1.presentPermission)(permissionFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePermission });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createRoleController = [
    (0, validator_1.validateSchema)(schemas_1.permissionSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const permission = new permission_entity_1.PermissionEntity(name);
            const permissionCreated = await (0, permission_interactor_1.createPermissionInteractor)(permission);
            const responsePermission = (0, permission_presenter_1.presentPermission)(permissionCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePermission });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteRoleController = [
    (0, validator_1.validateSchema)(schemas_1.permissionSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const permissionDeleted = await (0, permission_interactor_1.deletePermissionInteractor)(name);
            const responsePermission = (0, permission_presenter_1.presentPermission)(permissionDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePermission });
        }
        catch (error) {
            next(error);
        }
    },
];
