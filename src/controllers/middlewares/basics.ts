import logger from "@open-syk/common/logger";
import { NextFunction, Request, Response } from "express";

import { ErrorMessage } from "../../errors/errors.enum";
import { HttpStatusCode } from "../../gateways/basics";

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

export const logError = (error: any, _: Request, response: Response, __: NextFunction) => {
  let httpCode = (error.httpCode as number) ?? HttpStatusCode.INTERNAL_ERROR;
  if (error.name === "UnauthorizedError") {
    httpCode = HttpStatusCode.UNAUTHORIZED;
  }
  log.error("ERROR", {}, error);
  response.status(httpCode).json({ error: error.message });
};
