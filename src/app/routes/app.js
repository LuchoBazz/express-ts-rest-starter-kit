"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const basics_1 = require("../../adapters/api/middlewares/basics");
const organization_router_1 = __importDefault(require("./organization.router"));
const subscription_router_1 = __importDefault(require("./subscription.router"));
const router = (0, express_1.default)();
const logFormat = ":date[iso] :remote-addr :remote-user :method :url " +
    "HTTP/:http-version :status :res[content-length] - :response-time ms\n" +
    "Referer: :referrer\n" +
    "User-Agent: :user-agent";
router.use((0, cors_1.default)());
router.disable("x-powered-by");
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: false }));
router.get("/", basics_1.healthCheck);
router.get("/health", basics_1.healthCheck);
router.use("/organizations", organization_router_1.default);
router.use("/organizations", subscription_router_1.default);
router.use((0, morgan_1.default)(logFormat));
router.use(basics_1.logRequest);
router.use(basics_1.notFound);
router.use(basics_1.logError);
exports.default = router;
