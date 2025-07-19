import { NextFunction, Request, Response } from "express";

import {
  deleteAuthUserInteractor,
  getActiveTokensInteractor,
  logOutInteractor,
  refreshAuthTokenInteractor,
  revokeAllTokensByUserInteractor,
  revokeAllTokensExceptCurrentInteractor,
  revokeTokenByIdInteractor,
  signInInteractor,
  signUpInteractor,
  userLoggedInInteractor,
} from "../../../../core/interactors/authentication/auth.interactor";
import {
  getAuthorizationTokenFromHeaders,
  getClientIdFromHeaders,
  getNetworkMetadataFromHeaders,
} from "../../../../core/shared/utils/router.util";
import { SignUpUser } from "../../../../core/types/authentication/user.type";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentAuthTokenStatuses } from "../../../presenters/users/auth_token_statuses.presenter";
import { validateSchema } from "../../validator";
import { clientIdInHeaderSchema } from "../organizations/schemas";
import {
  authTokenStatusesIdSchema,
  authTypeSchema,
  deleteAuthUserSchema,
  refreshAuthTokenSchema,
  signInSchema,
  signUpSchema,
  userAuthorizationInSchema,
} from "./schemas";

export const signInController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(signInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const networkMetadata = getNetworkMetadataFromHeaders(request.headers);
      const { access_token: accessToken, email } = request.body;

      const token = await signInInteractor(clientId, accessToken as string, email as string, networkMetadata);

      response.status(HttpStatusCode.OK).json({ data: { token } });
    } catch (error) {
      next(error);
    }
  },
];

export const signUpController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(signUpSchema),
  validateSchema(authTypeSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const networkMetadata = getNetworkMetadataFromHeaders(request.headers);
      const {
        access_token: accessToken,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        terms,
        notifications,
        auth_type: authType,
      } = request.body;

      const data: SignUpUser = {
        username,
        firstName,
        lastName,
        email,
        terms,
        notifications,
        clientId,
        authType,
      };

      const token = await signUpInteractor(clientId, accessToken as string, data, networkMetadata);

      response.status(HttpStatusCode.OK).json({ data: { token } });
    } catch (error) {
      next(error);
    }
  },
];

export const refreshAuthTokenController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(refreshAuthTokenSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const networkMetadata = getNetworkMetadataFromHeaders(request.headers);
      const { refresh_token: refreshToken } = request.body;

      const newToken = await refreshAuthTokenInteractor(clientId, refreshToken as string, networkMetadata);

      response.status(HttpStatusCode.OK).json({ data: { token: newToken } });
    } catch (error) {
      next(error);
    }
  },
];

export const userLoggedInController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const user = await userLoggedInInteractor(clientId, token);

      response.status(HttpStatusCode.OK).json({ data: { user } });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteMyAccountController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(deleteAuthUserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { auth_id: authId } = request.params;
      const clientId = getClientIdFromHeaders(request.headers);

      const isDeleted = await deleteAuthUserInteractor(clientId, request.user!, authId);

      response.status(HttpStatusCode.OK).json({ data: { deleted: isDeleted } });
    } catch (error) {
      next(error);
    }
  },
];

export const logOutController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const success = await logOutInteractor(clientId, token);

      response.status(HttpStatusCode.OK).json({ data: { success } });
    } catch (error) {
      next(error);
    }
  },
];

export const revokeTokenByIdController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  validateSchema(authTokenStatusesIdSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { ats_id } = request.params;
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const success = await revokeTokenByIdInteractor(clientId, ats_id, token);

      response.status(HttpStatusCode.OK).json({ data: { success } });
    } catch (error) {
      next(error);
    }
  },
];

export const revokeAllTokensByUserController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const success = await revokeAllTokensByUserInteractor(clientId, token);

      response.status(HttpStatusCode.OK).json({ data: { success } });
    } catch (error) {
      next(error);
    }
  },
];

export const revokeAllTokensExceptCurrentController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const success = await revokeAllTokensExceptCurrentInteractor(clientId, token);

      response.status(HttpStatusCode.OK).json({ data: { success } });
    } catch (error) {
      next(error);
    }
  },
];

// TODO: should be dynamic (taking into account subscription type)
const MAX_ALLOWED_TOKENS = 3;

export const getActiveTokensController = [
  validateSchema(clientIdInHeaderSchema),
  validateSchema(userAuthorizationInSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = getClientIdFromHeaders(request.headers);
      const token = getAuthorizationTokenFromHeaders(request.headers);

      const tokens = await getActiveTokensInteractor(clientId, token);
      const shouldRevokeTokens = tokens.length > MAX_ALLOWED_TOKENS;
      const numberOfTokensToRevoke = Math.max(0, tokens.length - MAX_ALLOWED_TOKENS);

      response.status(HttpStatusCode.OK).json({
        data: {
          tokens: presentAuthTokenStatuses(tokens),
          should_revoke_tokens: shouldRevokeTokens,
          number_of_tokens_to_revoke: numberOfTokensToRevoke,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];
