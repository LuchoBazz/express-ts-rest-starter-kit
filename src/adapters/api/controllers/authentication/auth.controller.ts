import { NextFunction, Request, Response } from "express";

import {
  deleteAuthUserInteractor,
  signInInteractor,
  signUpInteractor,
  userLoggedInInteractor,
} from "../../../../core/interactors/authentication/auth.interactor";
import { SignUpUser } from "../../../../core/types/authentication/user.type";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { validateSchema } from "../../validator";
import { clientIdInHeaderSchema } from "../organizations/schemas";
import { deleteAuthUserSchema, signInSchema, signUpSchema, userLogguedInSchema } from "./schemas";

export const signInController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(signInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = request.headers["client-id"]?.toString() ?? "";
      const { access_token: accessToken, email } = request.body;

      const token = await signInInteractor(clientId, accessToken as string, email as string);

      response.status(HttpStatusCode.OK).json({ data: { token } });
    } catch (error) {
      next(error);
    }
  },
];

export const signUpController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(signUpSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = request.headers["client-id"]?.toString() ?? "";
      const {
        access_token: accessToken,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        identification_number: identificationNumber,
        phone_number: phoneNumber,
        terms,
        notifications,
      } = request.body;

      const data: SignUpUser = {
        username,
        firstName,
        lastName,
        email,
        identificationNumber: identificationNumber ?? null,
        phoneNumber: phoneNumber ?? null,
        terms,
        notifications,
        clientId,
      };

      const token = await signUpInteractor(clientId, accessToken as string, data);

      response.status(HttpStatusCode.OK).json({ data: { token } });
    } catch (error) {
      next(error);
    }
  },
];

export const userLoggedInController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userLogguedInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = request.headers["client-id"]?.toString() ?? "";
      const { Authorization: authorization } = request.headers;

      const token = authorization?.length ? authorization.toString() : "";

      const user = await userLoggedInInteractor(clientId, token);

      response.status(HttpStatusCode.OK).json({ data: { user } });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteMyAccountController = [
  validateSchema(deleteAuthUserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { auth_id: authId } = request.params;
      const clientId = request.headers["client-id"]?.toString() ?? "";

      const isDeleted = await deleteAuthUserInteractor(clientId, authId);

      response.status(HttpStatusCode.OK).json({ data: { deleted: isDeleted } });
    } catch (error) {
      next(error);
    }
  },
];
