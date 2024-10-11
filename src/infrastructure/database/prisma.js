"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSession = void 0;
const client_1 = require("@prisma/client");
const onSession = async (callback) => {
    const prisma = new client_1.PrismaClient();
    try {
        const response = await callback(prisma);
        return response;
    }
    catch (error) {
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.onSession = onSession;
