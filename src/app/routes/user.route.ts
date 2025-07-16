import { Router } from "express";

import { updateUserController } from "../../adapters/api/controllers/users/user.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_MODE } = PermissionsValues;

const user = Router();

// Users
user.put("/", permissionChecker([GUEST_MODE]), updateUserController);

export default user;
