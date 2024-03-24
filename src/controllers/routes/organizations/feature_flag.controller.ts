import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "../../../gateways/basics";
import { validateSchema } from "../../validator";
import { createFeatureFlagSchema, organizationSchema } from "./schemas";

export const createFeatureFlagController = [
  validateSchema(organizationSchema),
  validateSchema(createFeatureFlagSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id } = request.params;
      const { key } = request.body;

      await Promise.resolve();

      response.status(HttpStatusCode.OK).json({ client_id, key });
    } catch (error) {
      next(error);
    }
  },
];
