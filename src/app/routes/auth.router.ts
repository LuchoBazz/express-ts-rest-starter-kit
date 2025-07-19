import { Router } from "express";

import {
  deleteMyAccountController,
  getActiveTokensController,
  logOutController,
  refreshAuthTokenController,
  revokeAllTokensByUserController,
  revokeAllTokensExceptCurrentController,
  revokeTokenByIdController,
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

organization.get("/tokens", getActiveTokensController);
organization.post("/tokens/logout", logOutController);
organization.post("/tokens/revoke/:ats_id", revokeTokenByIdController);
organization.post("/tokens/revoke-all", revokeAllTokensByUserController);
organization.post("/tokens/revoke-all-except-current", revokeAllTokensExceptCurrentController);

organization.delete("delete-my-account/:auth_id", permissionChecker([]), deleteMyAccountController);

export default organization;
