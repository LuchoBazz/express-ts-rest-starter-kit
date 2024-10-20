import { NextFunction, Request, Response } from "express";

import {
  deleteAuthUserInteractor,
  validateAuthTokenInteractor,
} from "../../../../core/interactors/authentication/auth.interactor";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { validateSchema } from "../../validator";
import { deleteAuthUserSchema, signInSchema, signUpSchema } from "./schemas";

export const signInController = [
  validateSchema(signInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { access_token: accessToken, email } = request.body;

      const user = await validateAuthTokenInteractor(clientId, accessToken as string, email as string | undefined);

      response.status(HttpStatusCode.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  },
];

export const signUpController = [
  validateSchema(signUpSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { access_token: accessToken, email } = request.body;

      const user = await validateAuthTokenInteractor(clientId, accessToken as string, email as string | undefined);

      response.status(HttpStatusCode.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteMyAccountController = [
  validateSchema(deleteAuthUserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, auth_id: authId } = request.params;

      const isDeleted = await deleteAuthUserInteractor(clientId, authId);

      response.status(HttpStatusCode.OK).json({ data: { deleted: isDeleted } });
    } catch (error) {
      next(error);
    }
  },
];
