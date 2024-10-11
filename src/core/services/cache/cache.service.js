"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheService {
    constructor() {
        const ttlSeconds = 3600;
        this.cache = new node_cache_1.default({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }
    async get(parameters, client, searcher) {
        var _a;
        const key = parameters.generateKey();
        const value = (_a = this.cache.get(key)) !== null && _a !== void 0 ? _a : null;
        if (value || !searcher) {
            return value;
        }
        try {
            const newValue = await searcher(client, parameters.getSearchValues());
            this.cache.set(key, newValue);
            return newValue;
        }
        catch (error) {
            return null;
        }
    }
    delete(keys) {
        this.cache.del(keys);
    }
}
exports.CacheService = CacheService;
