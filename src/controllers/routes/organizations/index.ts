import { Router } from "express";

import { PermissionsValues } from "../../../entities/users/authentication.enum";
import { permissionChecker } from "../../middlewares/permitions";
import { createFeatureFlagController, updateFeatureFlagController } from "./feature_flag.controller";

const { GUEST_USER } = PermissionsValues;

const organization = Router();

organization.post("/:client_id/feature_flag", permissionChecker([GUEST_USER]), createFeatureFlagController);
organization.put("/:client_id/feature_flag/:key", permissionChecker([GUEST_USER]), updateFeatureFlagController);

export default organization;
