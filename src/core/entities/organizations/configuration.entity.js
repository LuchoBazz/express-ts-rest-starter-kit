"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationEntity = void 0;
const entity_1 = require("../entity");
class ConfigurationEntity extends entity_1.Entity {
    constructor(key, value, type, clientId) {
        super();
        this.key = key;
        this.value = value;
        this.type = type;
        this.clientId = clientId;
    }
    static fromPrisma(payload) {
        const config = new ConfigurationEntity(payload.configuration_key, payload.configuration_value, payload.configuration_type, payload.configuration_organization_client_id);
        config.setId(payload.configuration_id);
        return config;
    }
    toResponse() {
        return {
            id: this.getId(),
            key: this.getKey(),
            value: this.getValue(),
            type: this.getType(),
            organization_client_id: this.getClientId(),
        };
    }
    getKey() {
        return this.key;
    }
    setKey(key) {
        this.key = key;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getClientId() {
        return this.clientId;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
}
exports.ConfigurationEntity = ConfigurationEntity;
