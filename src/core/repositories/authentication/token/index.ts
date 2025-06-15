import { JwtTokenRepository } from "./jwt";
import { TokenRepository } from "./token_repository.interface";

export const getTokenRepository = (): TokenRepository => JwtTokenRepository;
