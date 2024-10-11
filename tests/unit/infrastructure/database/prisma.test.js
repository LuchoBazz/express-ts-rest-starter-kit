"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../../src/infrastructure/database/prisma");
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe.each([[[1, 2, 3]], [["A", "B", "C"]], [[true, false, false]], [[{ a: "A" }, { b: "B" }, { c: "C" }]]])("Given an onSession function", (input) => {
    afterEach(() => {
        disconnectMock.mockClear();
    });
    it("should return the returned data and disconnect the prisma session", async () => {
        const response = await (0, prisma_1.onSession)((_client) => {
            return Promise.resolve(input);
        });
        expect(response).toEqual(input);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
        expect(transactionMock).toHaveBeenCalledTimes(0);
    });
});
