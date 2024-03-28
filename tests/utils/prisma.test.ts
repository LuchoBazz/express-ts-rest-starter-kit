import { PrismaClient } from "@prisma/client";

import { onSession } from "../../src/utils/prisma";

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

describe.each([[[1, 2, 3]], [["A", "B", "C"]], [[true, false, false]], [[{ a: "A" }, { b: "B" }, { c: "C" }]]])(
  "Given an onSession function",
  (input: any[]) => {
    afterEach(() => {
      disconnectMock.mockClear();
    });

    it("should return the returned data and disconnect the prisma session", async () => {
      const response = await onSession((_client: PrismaClient) => {
        return Promise.resolve(input);
      });

      expect(response).toEqual(input);

      expect(disconnectMock).toHaveBeenCalledTimes(1);
      expect(transactionMock).toHaveBeenCalledTimes(0);
    });
  },
);
