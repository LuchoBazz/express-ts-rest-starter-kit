"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUserEntity = void 0;
const entity_1 = require("../entity");
class BaseUserEntity extends entity_1.Entity {
    constructor(firstName, lastName, email, role, clientId) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.clientId = clientId;
    }
    getFirstName() {
        return this.firstName;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
    getClientId() {
        return this.clientId;
    }
    setClientId(organizationClientId) {
        this.clientId = organizationClientId;
    }
}
exports.BaseUserEntity = BaseUserEntity;
