import { PrismaSubscriptionPlanRepository } from "./prisma";
import { SubscriptionPlanRepository } from "./subscription_plan_repository.interface";

export const getSubscriptionPlanRepository = (): SubscriptionPlanRepository => {
  return PrismaSubscriptionPlanRepository;
};
