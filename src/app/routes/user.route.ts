import { Router } from "express";

import { updateUserController } from "../../adapters/api/controllers/users/user.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";

const user = Router();

// Users
user.put("/", permissionChecker([]), updateUserController);

export default user;
