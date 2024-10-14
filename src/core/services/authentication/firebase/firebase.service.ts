import { ErrorMessage } from "../../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../../adapters/api/errors/unauthorized.error";
import { encodeJSON } from "../../../shared/utils/encode_json.util";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../../types/authentication/base.types";
import { OrganizationsFirebaseAuthEnv } from "../../../types/authentication/firebase.types";
import { BaseAuthService } from "../base_auth.service";
import { FirebaseClientManager } from "./firebase_config.service";

export class FirebaseAuthService extends BaseAuthService {
  public manager: FirebaseClientManager;

  constructor() {
    super();
    const firebaseConfig = encodeJSON<OrganizationsFirebaseAuthEnv>(process.env.FIREBASE_CREDENTIALS || "{}", {});
    this.manager = FirebaseClientManager.getInstance(firebaseConfig);
  }

  public async validateToken({ clientId, accessToken }: ValidateTokenPayload): Promise<AuthUser> {
    try {
      const admin = this.manager.getClient(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return {
        authId: firebaseResponse.uid,
        email: firebaseResponse.email,
      };
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
    }
  }

  public async deleteUser({ clientId, authId }: DeleteUserPayload): Promise<boolean> {
    try {
      const admin = this.manager.getClient(clientId);
      await admin.auth().deleteUser(authId);
      return true;
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.DELETING_USER_ERROR);
    }
  }
}
