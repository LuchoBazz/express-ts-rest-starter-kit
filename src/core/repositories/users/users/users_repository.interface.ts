import { CommonUserEntity } from "../../../entities/users/common_user.entity";
import { UpdateUserInput, UserSearchCriteriaInput } from "../../../types/users/user.types";

export interface UserRepository {
  findOne(client: unknown, clientId: string, email: string): Promise<CommonUserEntity | null>;
  create(client: unknown, user: CommonUserEntity): Promise<CommonUserEntity>;
  update(client: unknown, user: UpdateUserInput): Promise<CommonUserEntity>;
  delete(client: unknown, searchCriteria: UserSearchCriteriaInput): Promise<CommonUserEntity>;
}
