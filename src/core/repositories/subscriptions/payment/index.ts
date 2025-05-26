import { PaymentRepository } from "./payment-repository.interface";
import { PrismaPaymentRepository } from "./prisma";

export const getPaymentRepository = (): PaymentRepository => {
  return PrismaPaymentRepository;
};
