import { Router } from "express";

import { createFeatureFlagController } from "./feature_flag.controller";

const organization = Router();

organization.post("/:client_id/feature_flag", createFeatureFlagController);

export default organization;
