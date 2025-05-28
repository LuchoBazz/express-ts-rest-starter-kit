import { PrismaSubscriptionRepository } from "./prisma";
import { SubscriptionRepository } from "./subscriptions_repository.interface";

export const getSubscriptionRepository = (): SubscriptionRepository => PrismaSubscriptionRepository;
