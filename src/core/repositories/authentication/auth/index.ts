import { AuthRepository } from "./auth_repository.interface";
import { FirebaseAuthRepository } from "./firebase";

export const getAuthRepository = (): AuthRepository => FirebaseAuthRepository;
