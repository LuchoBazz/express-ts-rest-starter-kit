import { NextFunction, Request, Response } from "express";

import { updateUsersInteractor } from "../../../../core/interactors/users/users.interactor";
import { getClientIdFromHeaders } from "../../../../core/shared/utils/router.util";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentStandardUser } from "../../../presenters/users/standard_user.presenter";
import { validateSchema } from "../../validator";
import { updateUserSchema } from "./schemas";

export const updateUserController = [
  validateSchema(updateUserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);

      const {
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        identification_number: identificationNumber,
        phone_number: phoneNumber,
        terms,
        notifications,
        is_active: isActive,
        uid,
        role,
        auth_provider: authProvider,
        auth_type: authType,
      } = request.body;

      const userFound = await updateUsersInteractor({
        clientId,
        email,
        username,
        firstName,
        lastName,
        identificationNumber,
        phoneNumber,
        terms,
        notifications,
        isActive,
        uid,
        role,
        authProvider,
        authType,
      });

      const responseUser = presentStandardUser(userFound);
      response.status(HttpStatusCode.OK).json({ data: responseUser });
    } catch (error) {
      next(error);
    }
  },
];
