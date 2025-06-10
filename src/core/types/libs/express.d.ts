import { BaseUserEntity } from "../../entities/users/user_base.entity";

declare global {
  namespace Express {
    interface Request {
      user?: BaseUserEntity;
    }
  }
}
