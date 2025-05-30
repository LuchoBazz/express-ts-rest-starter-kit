import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { UnauthorizedError } from "../../../../../adapters/api/errors/unauthorized.error";
import { encodeJSON } from "../../../../shared/utils/encode_json.util";
import { AuthUser, DeleteUserPayload, ValidateTokenPayload } from "../../../../types/authentication/base.types";
import { OrganizationsFirebaseAuthEnv } from "../../../../types/authentication/firebase.types";
import { AuthRepository } from "../auth_repository.interface";
import { FirebaseClientManager } from "./firebase_client_manager.config";

const firebaseConfig = encodeJSON<OrganizationsFirebaseAuthEnv>(process.env.FIREBASE_CREDENTIALS || "{}", {});
const manager = FirebaseClientManager.getInstance(firebaseConfig);

export const FirebaseAuthRepository: AuthRepository = {
  async validateToken(payload: ValidateTokenPayload): Promise<AuthUser> {
    try {
      const { clientId, accessToken } = payload;
      const admin = manager.getClient(clientId);
      const firebaseResponse = await admin.auth().verifyIdToken(accessToken);
      return { authId: firebaseResponse.uid, email: firebaseResponse.email };
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.INVALID_JWT_TOKEN);
    }
  },
  async deleteUser(payload: DeleteUserPayload): Promise<boolean> {
    try {
      const { clientId, authId } = payload;
      const admin = manager.getClient(clientId);
      await admin.auth().deleteUser(authId);
      return true;
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.DELETING_USER_ERROR);
    }
  },
};
