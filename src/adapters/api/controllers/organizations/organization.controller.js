"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationController = exports.createOrganizationController = exports.findOrganizationController = void 0;
const organization_entity_1 = require("../../../../core/entities/organizations/organization.entity");
const organization_interactor_1 = require("../../../../core/interactors/organizations/organization/organization.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const organization_presenter_1 = require("../../../presenters/organizations/organization.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findOrganizationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const organizationFound = await (0, organization_interactor_1.findOrganizationInteractor)(clientId);
            const organizationFlag = (0, organization_presenter_1.presentOrganization)(organizationFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: organizationFlag });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createOrganizationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.createOrganizationSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { name } = request.body;
            const organization = new organization_entity_1.OrganizationEntity(name, clientId);
            const organizationCreated = await (0, organization_interactor_1.createOrganizationInteractor)(organization);
            const responseOrganization = (0, organization_presenter_1.presentOrganization)(organizationCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseOrganization });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updateOrganizationController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_1.updateOrganizationSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { name } = request.body;
            const featureFlag = {
                clientId,
                name: name,
            };
            const organizationUpdated = await (0, organization_interactor_1.updateOrganizationInteractor)(featureFlag);
            const responseOrganization = (0, organization_presenter_1.presentOrganization)(organizationUpdated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseOrganization });
        }
        catch (error) {
            next(error);
        }
    },
];
