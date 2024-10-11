"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationEntity = void 0;
const entity_1 = require("../entity");
class OrganizationEntity extends entity_1.Entity {
    constructor(name, clientId) {
        super();
        this.name = name;
        this.clientId = clientId;
    }
    static fromPrisma(payload) {
        const organization = new OrganizationEntity(payload.organization_name, payload.organization_client_id);
        organization.setId(payload.organization_id);
        return organization;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getClientId() {
        return this.clientId;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
}
exports.OrganizationEntity = OrganizationEntity;
