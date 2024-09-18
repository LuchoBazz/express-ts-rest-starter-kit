import { ConfigurationTypeEnum } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { ConfigurationEntity } from "../../../entities/organizations/configuration.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import { createConfigurationInteractor } from "../../../interactors/organizations/configuration/configuration.interactor";
import { presentConfiguration } from "../../../presenters/organizations/configuration.presenter";
import { validateSchema } from "../../validator";
import { createConfigurationSchema, organizationSchema } from "./schemas";

export const createConfigurationController = [
  validateSchema(organizationSchema),
  validateSchema(createConfigurationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { key, value, type } = request.body;

      const config = new ConfigurationEntity(
        key as string,
        value as string,
        type as ConfigurationTypeEnum,
        // isActive,
        clientId,
      );

      const configurationCreated = await createConfigurationInteractor(config);

      const responseConfiguration = presentConfiguration(configurationCreated);
      response.status(HttpStatusCode.OK).json({ data: responseConfiguration });
    } catch (error) {
      next(error);
    }
  },
];
