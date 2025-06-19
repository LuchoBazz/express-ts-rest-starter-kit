import { Router } from "express";

import {
  deleteMyAccountController,
  signInController,
  signUpController,
} from "../../adapters/api/controllers/authentication/auth.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_USER } = PermissionsValues;

const organization = Router();

// Auth
organization.post("/sign-in", permissionChecker([GUEST_USER]), signInController);
organization.post("/sign-up", permissionChecker([GUEST_USER]), signUpController);
organization.delete("/delete-my-account/:auth_id", permissionChecker([GUEST_USER]), deleteMyAccountController);

export default organization;
