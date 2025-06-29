import { StandardUserEntity } from "../../../entities/users/standard_user.entity";
import { UpdateUserInput, UserSearchCriteriaInput } from "../../../types/users/user.types";

export interface UserRepository {
  findOne(client: unknown, clientId: string, email: string): Promise<StandardUserEntity | null>;
  create(client: unknown, user: StandardUserEntity): Promise<StandardUserEntity>;
  update(client: unknown, user: UpdateUserInput): Promise<StandardUserEntity>;
  delete(client: unknown, searchCriteria: UserSearchCriteriaInput): Promise<StandardUserEntity>;
}
