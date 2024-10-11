"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPermissionsToRoleSchema = exports.permissionOnRoleSchema = exports.permissionSchema = exports.roleSchema = void 0;
const express_validator_1 = require("express-validator");
exports.roleSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing name.",
        },
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "name can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "name is not a string.",
        },
    },
});
exports.permissionSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing name.",
        },
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "name can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "name is not a string.",
        },
    },
});
exports.permissionOnRoleSchema = (0, express_validator_1.checkSchema)({
    role_name: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing role_name.",
        },
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "role_name can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "role_name is not a string.",
        },
    },
});
exports.addPermissionsToRoleSchema = (0, express_validator_1.checkSchema)({
    role_name: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing role_name.",
        },
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "role_name can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "role_name is not a string.",
        },
    },
    permissions: {},
});
