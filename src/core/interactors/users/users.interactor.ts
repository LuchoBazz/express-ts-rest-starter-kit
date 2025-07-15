import { PrismaClient } from "@prisma/client";

import { onSession } from "../../../infrastructure/database/prisma";
import { StandardUserEntity } from "../../entities/users/a_standard_user.entity";
import { getUserRepository } from "../../repositories/users/users";
import { UpdateUserInput } from "../../types/users/user.types";

export const updateUsersInteractor = async (user: UpdateUserInput): Promise<StandardUserEntity> => {
  const userRepository = getUserRepository();
  const subscriptionUpdated = await onSession((client: PrismaClient) => userRepository.update(client, user));
  return subscriptionUpdated;
};
