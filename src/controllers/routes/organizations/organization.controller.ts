import { NextFunction, Request, Response } from "express";

import { OrganizationEntity } from "../../../entities/organizations/organization.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import {
  createOrganizationInteractor,
  findOrganizationInteractor,
  updateOrganizationInteractor,
} from "../../../interactors/organizations/organization/organization.interactor";
import { UpdateOrganizationInput } from "../../../interactors/organizations/organization/organization.types";
import { presentOrganization } from "../../../presenters/organizations/organization.presenter";
import { validateSchema } from "../../validator";
import { createOrganizationSchema, organizationSchema, updateOrganizationSchema } from "./schemas";

export const findOrganizationController = [
  validateSchema(organizationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;

      const organizationFound = await findOrganizationInteractor(clientId);

      const organizationFlag = presentOrganization(organizationFound);
      response.status(HttpStatusCode.OK).json({ data: organizationFlag });
    } catch (error) {
      next(error);
    }
  },
];

export const createOrganizationController = [
  validateSchema(organizationSchema),
  validateSchema(createOrganizationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { name } = request.body;

      const organization = new OrganizationEntity(name as string, clientId);

      const organizationCreated = await createOrganizationInteractor(organization);

      const responseOrganization = presentOrganization(organizationCreated);
      response.status(HttpStatusCode.OK).json({ data: responseOrganization });
    } catch (error) {
      next(error);
    }
  },
];

export const updateOrganizationController = [
  validateSchema(organizationSchema),
  validateSchema(updateOrganizationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const { name } = request.body;

      const featureFlag: UpdateOrganizationInput = {
        clientId,
        name: name as string,
      };

      const organizationUpdated = await updateOrganizationInteractor(featureFlag);

      const responseOrganization = presentOrganization(organizationUpdated);
      response.status(HttpStatusCode.OK).json({ data: responseOrganization });
    } catch (error) {
      next(error);
    }
  },
];
