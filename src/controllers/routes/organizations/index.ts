import { Router } from "express";

import { PermissionsValues } from "../../entities/authentication.entity";
import { permissionChecker } from "../../middlewares/permitions";
import { createFeatureFlagController } from "./feature_flag.controller";

const { GUEST_USER } = PermissionsValues;

const organization = Router();

organization.post("/:client_id/feature_flag", permissionChecker([GUEST_USER]), createFeatureFlagController);

export default organization;
