import { OrganizationRepository } from "./organizations_repository.interface";
import { PrismaOrganizationRepository } from "./prisma";

export const getOrganizationRepository = (): OrganizationRepository => PrismaOrganizationRepository;
