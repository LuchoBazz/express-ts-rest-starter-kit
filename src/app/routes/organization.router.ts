import { Router } from "express";

import {
  createConfigurationController,
  deleteConfigurationController,
  findConfigurationController,
  updateConfigurationController,
} from "../../adapters/api/controllers/organizations/configuration.controller";
import {
  createFeatureFlagController,
  deleteFeatureFlagController,
  findFeatureFlagController,
  updateFeatureFlagController,
} from "../../adapters/api/controllers/organizations/feature_flag.controller";
import {
  createOrganizationController,
  findOrganizationController,
  updateOrganizationController,
} from "../../adapters/api/controllers/organizations/organization.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_MODE } = PermissionsValues;

const organization = Router();

// Organization
organization.get("/:client_id", permissionChecker([GUEST_MODE]), findOrganizationController);
organization.post("/:client_id", permissionChecker([GUEST_MODE]), createOrganizationController);
organization.put("/:client_id", permissionChecker([GUEST_MODE]), updateOrganizationController);

// Feature Flags
organization.get("/:client_id/feature_flag/:key", permissionChecker([GUEST_MODE]), findFeatureFlagController);
organization.post("/:client_id/feature_flag", permissionChecker([GUEST_MODE]), createFeatureFlagController);
organization.put("/:client_id/feature_flag/:key", permissionChecker([GUEST_MODE]), updateFeatureFlagController);
organization.delete("/:client_id/feature_flag/:key", permissionChecker([GUEST_MODE]), deleteFeatureFlagController);

// Configuration
organization.get("/:client_id/configuration/:key", permissionChecker([GUEST_MODE]), findConfigurationController);
organization.post("/:client_id/configuration", permissionChecker([GUEST_MODE]), createConfigurationController);
organization.put("/:client_id/configuration/:key", permissionChecker([GUEST_MODE]), updateConfigurationController);
organization.delete("/:client_id/configuration/:key", permissionChecker([GUEST_MODE]), deleteConfigurationController);

export default organization;
