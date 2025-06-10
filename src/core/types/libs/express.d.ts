import { CommonUserEntity } from "../../entities/users/common_user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: CommonUserEntity;
    }
  }
}
