import { ConfigurationTypeEnum } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { ConfigurationEntity } from "../../../entities/organizations/configuration.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import {
  createConfigurationInteractor,
  deleteConfigurationInteractor,
  findConfigurationInteractor,
  updateConfigurationInteractor,
} from "../../../interactors/organizations/configuration/configuration.interactor";
import { UpdateConfigurationInput } from "../../../interactors/organizations/configuration/configuration.types";
import { presentConfiguration } from "../../../presenters/organizations/configuration.presenter";
import { validateSchema } from "../../validator";
import {
  configurationKeyParamsSchema,
  createConfigurationSchema,
  organizationSchema,
  updateConfigurationSchema,
} from "./schemas";

export const findConfigurationController = [
  validateSchema(organizationSchema),
  validateSchema(configurationKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, key } = request.params;

      const configurationFound = await findConfigurationInteractor({ key, clientId });

      const configurationFlag = presentConfiguration(configurationFound);
      response.status(HttpStatusCode.OK).json({ data: configurationFlag });
    } catch (error) {
      next(error);
    }
  },
];

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

export const updatConfigurationController = [
  validateSchema(organizationSchema),
  validateSchema(configurationKeyParamsSchema),
  validateSchema(updateConfigurationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, key } = request.params;
      const { value, type } = request.body;

      const featureFlag: UpdateConfigurationInput = {
        clientId,
        key,
        type,
        value,
      };

      const configurationUpdated = await updateConfigurationInteractor(featureFlag);

      const responseConfiguration = presentConfiguration(configurationUpdated);
      response.status(HttpStatusCode.OK).json({ data: responseConfiguration });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteConfigurationController = [
  validateSchema(organizationSchema),
  validateSchema(configurationKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, key } = request.params;

      const configurationDeleted = await deleteConfigurationInteractor({ key, clientId });

      const responseConfiguration = presentConfiguration(configurationDeleted);
      response.status(HttpStatusCode.OK).json({ data: responseConfiguration });
    } catch (error) {
      next(error);
    }
  },
];
