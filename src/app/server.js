"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("@open-syk/common/logger"));
const app_1 = __importDefault(require("./routes/app"));
const log = (0, logger_1.default)("Main Server");
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app_1.default.listen(port, () => {
    log.info("APP_LISTENING_ON_PORT", { port });
});
