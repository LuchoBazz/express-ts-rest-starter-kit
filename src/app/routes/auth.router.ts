import { Router } from "express";

import {
  deleteMyAccountController,
  refreshAtuhTokenController,
  signInController,
  signUpController,
  userLoggedInController,
} from "../../adapters/api/controllers/authentication/auth.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_USER } = PermissionsValues;

const organization = Router();

// Auth
organization.post("/sign-in", signInController);
organization.post("/sign-up", signUpController);
organization.post("/refresh-token", refreshAtuhTokenController);
organization.post("/user-logged-in", userLoggedInController);
organization.delete("/delete-my-account/:auth_id", permissionChecker([GUEST_USER]), deleteMyAccountController);

export default organization;
