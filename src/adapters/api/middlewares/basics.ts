import logger from "@open-syk/common/logger";
import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../../infrastructure/http/basics";
import { ErrorMessage } from "../errors/errors.enum";

const log = logger("EXPRESS_STARTER_KIT");

export const healthCheck = (_: Request, response: Response) => {
  response.status(HttpStatusCode.OK).json({ status: "APP_IS_HEALTHY" });
};

export const logRequest = (request: Request, _: Response, next: NextFunction) => {
  const { url, method, body } = request;
  log.info("REQUEST_RECEIVED", { url, method, body });
  next();
};

export const notFound = (_: Request, response: Response, __: NextFunction) => {
  response.status(HttpStatusCode.NOT_FOUND).json({ error: ErrorMessage.NOT_FOUND });
};

export const logError = (error: any, _: Request, res: Response, __: NextFunction) => {
  const httpCode = (error?.status ?? HttpStatusCode.INTERNAL_ERROR) as number;
  const message = error?.message ?? ErrorMessage.INTERNAL_SERVER_ERROR;
  const errors = error?.errors?.length ? error.errors : undefined;
  res.status(httpCode).json({ message, errors });
};
