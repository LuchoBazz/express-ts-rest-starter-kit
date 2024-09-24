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

const { GUEST_USER } = PermissionsValues;

const organization = Router();

// Organization
organization.get("/:client_id", permissionChecker([GUEST_USER]), findOrganizationController);
organization.post("/:client_id", permissionChecker([GUEST_USER]), createOrganizationController);
organization.put("/:client_id", permissionChecker([GUEST_USER]), updateOrganizationController);

// Feature Flags
organization.get("/:client_id/feature_flag/:key", permissionChecker([GUEST_USER]), findFeatureFlagController);
organization.post("/:client_id/feature_flag", permissionChecker([GUEST_USER]), createFeatureFlagController);
organization.put("/:client_id/feature_flag/:key", permissionChecker([GUEST_USER]), updateFeatureFlagController);
organization.delete("/:client_id/feature_flag/:key", permissionChecker([GUEST_USER]), deleteFeatureFlagController);

// Configuration
organization.get("/:client_id/configuration/:key", permissionChecker([GUEST_USER]), findConfigurationController);
organization.post("/:client_id/configuration", permissionChecker([GUEST_USER]), createConfigurationController);
organization.put("/:client_id/configuration/:key", permissionChecker([GUEST_USER]), updateConfigurationController);
organization.delete("/:client_id/configuration/:key", permissionChecker([GUEST_USER]), deleteConfigurationController);

export default organization;
