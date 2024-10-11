"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const role_enum_1 = require("../../../../../src/core/entities/users/role.enum");
const role_service_1 = require("../../../../../src/core/services/users/role.service");
const role_mock_1 = require("../../../../mocks/users/role.mock");
const roleMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                role: {
                    findUnique: roleMock,
                    create: roleMock,
                    delete: roleMock,
                },
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a role service", () => {
    let prismaClient;
    let rolePrisma;
    let role;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        rolePrisma = (0, role_mock_1.genRandomRolePrisma)();
        role = role_enum_1.RoleEntity.fromPrisma(rolePrisma);
        roleMock.mockImplementation(() => {
            return rolePrisma;
        });
        transactionMock.mockImplementation(() => {
            return [rolePrisma];
        });
    });
    afterEach(() => {
        roleMock.mockClear();
        transactionMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should find a role successfully", async () => {
        const roleFound = await (0, role_service_1.findRoleService)(prismaClient, role.getName());
        expect(roleFound).toEqual(role);
        expect(roleMock).toHaveBeenCalledTimes(1);
    });
    it("should create a role successfully", async () => {
        const roleCreated = await (0, role_service_1.createRoleService)(prismaClient, role);
        expect(roleCreated).toEqual(role);
        expect(roleMock).toHaveBeenCalledTimes(1);
    });
    it("should delete a role successfully", async () => {
        const roleDeleted = await (0, role_service_1.deleteRoleService)(prismaClient, role.getName());
        expect(roleDeleted).toEqual(role);
        expect(roleMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for error handling
});
