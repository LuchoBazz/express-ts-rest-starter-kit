import { NextFunction, Request, Response } from "express";

import { OrganizationEntity } from "../../../entities/organizations/organization.entity";
import { HttpStatusCode } from "../../../gateways/basics";
import { createOrganizationInteractor } from "../../../interactors/organizations/organization/organization.interactor";
import { presentOrganization } from "../../../presenters/organizations/organization.presenter";
import { validateSchema } from "../../validator";
import { createOrganizationSchema, organizationSchema } from "./schemas";

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
