import { Router } from "express";

import {
  deleteMyAccountController,
  logOutController,
  refreshAuthTokenController,
  revokeAllTokensByUserController,
  signInController,
  signUpController,
  userLoggedInController,
} from "../../adapters/api/controllers/authentication/auth.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";

const organization = Router();

// Auth
organization.post("/sign-in", signInController);
organization.post("/sign-up", signUpController);
organization.post("/refresh-token", refreshAuthTokenController);
organization.post("/user-logged-in", userLoggedInController);
organization.post("/logout", logOutController);
organization.post("/revoke-all", revokeAllTokensByUserController);
organization.delete("/delete-my-account/:auth_id", permissionChecker([]), deleteMyAccountController);

export default organization;
