"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleController = exports.createRoleController = exports.findRoleController = void 0;
const role_enum_1 = require("../../../../core/entities/users/role.enum");
const role_interactor_1 = require("../../../../core/interactors/users/role/role.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const role_presenter_1 = require("../../../presenters/users/role.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findRoleController = [
    (0, validator_1.validateSchema)(schemas_1.roleSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const roleFound = await (0, role_interactor_1.findRoleInteractor)(name);
            const roleFlag = (0, role_presenter_1.presentRole)(roleFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: roleFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createRoleController = [
    (0, validator_1.validateSchema)(schemas_1.roleSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const role = new role_enum_1.RoleEntity(name);
            const roleCreated = await (0, role_interactor_1.createRoleInteractor)(role);
            const responseRole = (0, role_presenter_1.presentRole)(roleCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseRole });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteRoleController = [
    (0, validator_1.validateSchema)(schemas_1.roleSchema),
    async (request, response, next) => {
        try {
            const { name } = request.params;
            const roleDeleted = await (0, role_interactor_1.deleteRoleInteractor)(name);
            const responseRole = (0, role_presenter_1.presentRole)(roleDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseRole });
        }
        catch (error) {
            next(error);
        }
    },
];
