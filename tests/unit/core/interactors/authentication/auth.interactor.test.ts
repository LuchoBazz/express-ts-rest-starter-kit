const authServiceMock = jest.fn();

import { faker } from "@faker-js/faker";

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../../../src/adapters/api/errors/unauthorized.error";
import {
  deleteAuthUserInteractor,
  validateAuthTokenInteractor,
} from "../../../../../src/core/interactors/authentication/auth.interactor";
import { AuthUser } from "../../../../../src/core/types/authentication/base.types";

const disconnectMock = jest.fn();

jest.mock("../../../../../src/core/services/authentication/auth.service", () => {
  return {
    AuthService: {
      getInstance: jest.fn(() => {
        return {
          validateToken: authServiceMock,
          deleteUser: authServiceMock,
        };
      }),
    },
  };
});

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        $disconnect: disconnectMock,
      };
    }),
  };
});

const clientId: string = "DEMO";

describe("Given a validateAuthTokenInteractor", () => {
  let authUser: AuthUser;

  beforeEach(() => {
    authUser = { authId: faker.string.alpha(10) };

    authServiceMock.mockImplementation(() => {
      return Promise.resolve(authUser);
    });
  });

  afterEach(() => {
    authServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should validate token successfully", async () => {
    const user = await validateAuthTokenInteractor(clientId, "validToken", authUser.email);

    expect(user).toEqual(authUser);
    expect(authServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should throw UnauthorizedError if token validation fails", async () => {
    authServiceMock.mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    await expect(validateAuthTokenInteractor(clientId, "invalidToken")).rejects.toThrow(
      new UnauthorizedError(ErrorMessage.UNAUTHORIZED),
    );
    expect(authServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});

describe("Given a deleteAuthUserInteractor", () => {
  let authUser: AuthUser;

  beforeEach(() => {
    authUser = { authId: faker.string.alpha(10) };

    authServiceMock.mockImplementation(() => {
      return Promise.resolve(true);
    });
  });

  afterEach(() => {
    authServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should delete user successfully", async () => {
    const isDeleted = await deleteAuthUserInteractor(clientId, authUser.authId);

    expect(isDeleted).toBe(true);
    expect(authServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should return false if deleteUser fails", async () => {
    authServiceMock.mockImplementationOnce(() => {
      return Promise.resolve(false);
    });

    const isDeleted = await deleteAuthUserInteractor(clientId, authUser.authId);

    expect(isDeleted).toBe(false);
    expect(authServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
