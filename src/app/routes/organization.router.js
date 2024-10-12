"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configuration_controller_1 = require("../../adapters/api/controllers/organizations/configuration.controller");
const feature_flag_controller_1 = require("../../adapters/api/controllers/organizations/feature_flag.controller");
const organization_controller_1 = require("../../adapters/api/controllers/organizations/organization.controller");
const permitions_1 = require("../../adapters/api/middlewares/permitions");
const authentication_enum_1 = require("../../core/entities/users/authentication.enum");
const { GUEST_USER } = authentication_enum_1.PermissionsValues;
const organization = (0, express_1.Router)();
// Organization
organization.get("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), organization_controller_1.findOrganizationController);
organization.post("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), organization_controller_1.createOrganizationController);
organization.put("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), organization_controller_1.updateOrganizationController);
// Feature Flags
organization.get("/:client_id/feature_flag/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), feature_flag_controller_1.findFeatureFlagController);
organization.post("/:client_id/feature_flag", (0, permitions_1.permissionChecker)([GUEST_USER]), feature_flag_controller_1.createFeatureFlagController);
organization.put("/:client_id/feature_flag/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), feature_flag_controller_1.updateFeatureFlagController);
organization.delete("/:client_id/feature_flag/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), feature_flag_controller_1.deleteFeatureFlagController);
// Configuration
organization.get("/:client_id/configuration/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), configuration_controller_1.findConfigurationController);
organization.post("/:client_id/configuration", (0, permitions_1.permissionChecker)([GUEST_USER]), configuration_controller_1.createConfigurationController);
organization.put("/:client_id/configuration/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), configuration_controller_1.updateConfigurationController);
organization.delete("/:client_id/configuration/:key", (0, permitions_1.permissionChecker)([GUEST_USER]), configuration_controller_1.deleteConfigurationController);
exports.default = organization;
