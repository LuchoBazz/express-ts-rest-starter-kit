import { CommonUserEntity } from "../../../entities/users/common_user.entity";

export interface UserRepository {
  findOne(client: unknown, email: string): Promise<CommonUserEntity | null>;
}
