import { CommonUserEntity } from "../../../entities/users/common_user.entity";

export interface UserRepository {
  findOne(client: unknown, clientId: string, email: string): Promise<CommonUserEntity | null>;
}
