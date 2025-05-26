import { PaymentRepository } from "./interface";
import { PrismaPaymentRepository } from "./prisma";

export const getPaymentRepository = (): PaymentRepository => {
  return PrismaPaymentRepository;
};
