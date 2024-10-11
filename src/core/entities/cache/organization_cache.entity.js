"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCacheParameters = exports.CacheParameters = void 0;
class CacheParameters {
}
exports.CacheParameters = CacheParameters;
class OrganizationCacheParameters extends CacheParameters {
    constructor(clientId, paramKey) {
        super();
        this.clientId = clientId;
        this.paramKey = paramKey;
    }
    generateKey() {
        return `${this.getClientId()}-${this.getParamKey()}`;
    }
    getSearchValues() {
        return [this.getClientId(), this.getParamKey()];
    }
    getClientId() {
        return this.clientId;
    }
    getParamKey() {
        return this.paramKey;
    }
}
exports.OrganizationCacheParameters = OrganizationCacheParameters;
