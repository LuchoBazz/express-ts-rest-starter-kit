"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationSchema = exports.createOrganizationSchema = exports.updateConfigurationSchema = exports.createConfigurationSchema = exports.configurationKeyParamsSchema = exports.updateFeatureFlagSchema = exports.createFeatureFlagSchema = exports.featureFlagKeyParamsSchema = exports.organizationSchema = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
exports.organizationSchema = (0, express_validator_1.checkSchema)({
    client_id: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing client_id.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "client_id can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "client_id is not a string.",
        },
    },
});
// FEATURE FLAGS
exports.featureFlagKeyParamsSchema = (0, express_validator_1.checkSchema)({
    key: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing key.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "key can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "key is not a string.",
        },
    },
});
exports.createFeatureFlagSchema = (0, express_validator_1.checkSchema)({
    key: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing key.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "key can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "key is not a string.",
        },
    },
    percentage: {
        in: ["body"],
        isInt: {
            errorMessage: "percentage is not a integer.",
        },
        toInt: true,
    },
    is_experimental: {
        in: ["body"],
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "is_experimental can not be null.",
            bail: true,
        },
        isBoolean: {
            errorMessage: "is_experimental is not a boolean.",
        },
    },
});
exports.updateFeatureFlagSchema = (0, express_validator_1.checkSchema)({
    percentage: {
        in: ["body"],
        isInt: {
            errorMessage: "percentage is not a integer.",
        },
        toInt: true,
    },
    is_experimental: {
        in: ["body"],
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            errorMessage: "is_experimental can not be null.",
            bail: true,
        },
        isBoolean: {
            errorMessage: "is_experimental is not a boolean.",
        },
    },
    is_active: {
        in: ["body"],
        optional: {
            options: {
                nullable: false,
            },
        },
        exists: {
            errorMessage: "is_active can not be null.",
            bail: true,
        },
        isBoolean: {
            errorMessage: "is_experimental is not a boolean.",
        },
    },
});
// CONFIGURATIONS
exports.configurationKeyParamsSchema = (0, express_validator_1.checkSchema)({
    key: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing key.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "key can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "key is not a string.",
        },
    },
});
exports.createConfigurationSchema = (0, express_validator_1.checkSchema)({
    key: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing key.",
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
            errorMessage: "key can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "key is not a string.",
        },
    },
    value: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing value.",
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
            errorMessage: "value can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "value is not a string.",
        },
    },
    type: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing type.",
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
            errorMessage: "type can not be null.",
            bail: true,
        },
        isIn: {
            options: [Object.keys(client_1.ConfigurationTypeEnum)],
            errorMessage: "Not an valid type.",
        },
    },
});
exports.updateConfigurationSchema = (0, express_validator_1.checkSchema)({
    key: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing key.",
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
            errorMessage: "key can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "key is not a string.",
        },
    },
    value: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing value.",
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
            errorMessage: "value can not be null.",
            bail: true,
        },
        isString: {
            errorMessage: "value is not a string.",
        },
    },
    type: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing type.",
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
            errorMessage: "type can not be null.",
            bail: true,
        },
        isIn: {
            options: [Object.keys(client_1.ConfigurationTypeEnum)],
            errorMessage: "Not an valid type.",
        },
    },
});
// ORGANIZATION
exports.createOrganizationSchema = (0, express_validator_1.checkSchema)({
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
exports.updateOrganizationSchema = (0, express_validator_1.checkSchema)({
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
