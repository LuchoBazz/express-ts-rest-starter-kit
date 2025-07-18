import { NextFunction, Request, Response } from "express";

import { updateUsersInteractor } from "../../../../core/interactors/users/users.interactor";
import { getClientIdFromHeaders } from "../../../../core/shared/utils/router.util";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentStandardUser } from "../../../presenters/users/standard_user.presenter";
import { ErrorMessage } from "../../errors/errors.enum";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { validateSchema } from "../../validator";
import { updateUserSchema } from "./schemas";

export const updateUserController = [
  validateSchema(updateUserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const { user } = request;

      const {
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        identification_number: identificationNumber,
        phone_number: phoneNumber,
        terms,
        notifications,
      } = request.body;

      if (!user || email !== user.getEmail() || clientId !== user.getClientId()) {
        throw new UnauthorizedError(ErrorMessage.UNAUTHORIZED);
      }

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
      });

      const responseUser = presentStandardUser(userFound);
      response.status(HttpStatusCode.OK).json({ data: responseUser });
    } catch (error) {
      next(error);
    }
  },
];
