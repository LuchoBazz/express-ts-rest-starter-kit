import { NextFunction, Request, Response } from "express";

import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import {
  createFeatureFlagInteractor,
  updateFeatureFlagInteractor,
} from "../../../interactors/organizations/feature_flag/feature_flag.interactor";
import { UpdateFeatureFlagInput } from "../../../interactors/organizations/feature_flag/feature_flag.types";
import { presentFeatureFlag } from "../../../presenters/organizations/feature_flag.presenter";
import { validateSchema } from "../../validator";
import { createFeatureFlagSchema, organizationSchema, updateFeatureFlagSchema } from "./schemas";

export const createFeatureFlagController = [
  validateSchema(organizationSchema),
  validateSchema(createFeatureFlagSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { key, percentage, is_experimental: isExperimental } = request.body;
      const isActive = true;

      const featureFlag = new FeatureFlagEntity(
        key as string,
        percentage as number,
        isExperimental as boolean,
        isActive,
        clientId,
      );

      const featureFlagCreated = await createFeatureFlagInteractor(featureFlag);

      const responseFeatureFlag = presentFeatureFlag(featureFlagCreated);
      response.status(HttpStatusCode.OK).json({ data: responseFeatureFlag });
    } catch (error) {
      next(error);
    }
  },
];

export const updateFeatureFlagController = [
  validateSchema(organizationSchema),
  validateSchema(updateFeatureFlagSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, key } = request.params;
      const { percentage, is_experimental: isExperimental, is_active: isActive } = request.body;

      const featureFlag: UpdateFeatureFlagInput = {
        key,
        percentage: percentage ?? undefined,
        isExperimental: isExperimental ?? undefined,
        isActive: isActive ?? undefined,
        clientId,
      };

      const featureFlagCreated = await updateFeatureFlagInteractor(featureFlag);

      const responseFeatureFlag = presentFeatureFlag(featureFlagCreated);
      response.status(HttpStatusCode.OK).json({ data: responseFeatureFlag });
    } catch (error) {
      next(error);
    }
  },
];
