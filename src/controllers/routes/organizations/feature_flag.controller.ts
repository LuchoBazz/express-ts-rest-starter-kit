import { NextFunction, Request, Response } from "express";

import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import { createFeatureFlagInteractor } from "../../../interactors/organizations/feature_flag/feature_flag.interactor";
import { presentFeatureFlag } from "../../../presenters/organizations/feature_flag.presenter";
import { validateSchema } from "../../validator";
import { createFeatureFlagSchema, organizationSchema } from "./schemas";

export const createFeatureFlagController = [
  validateSchema(organizationSchema),
  validateSchema(createFeatureFlagSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { key, percentage, is_experimental: isExperimental } = request.body;

      const featureFlag = new FeatureFlagEntity(
        key as string,
        percentage as number,
        isExperimental as boolean,
        true,
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
