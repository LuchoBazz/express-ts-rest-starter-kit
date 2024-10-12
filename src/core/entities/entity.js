"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const uuid_1 = require("uuid");
class Entity {
    constructor(id) {
        this.id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
exports.Entity = Entity;
