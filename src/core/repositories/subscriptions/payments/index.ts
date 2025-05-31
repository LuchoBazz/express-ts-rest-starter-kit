import { PaymentRepository } from "./payment_repository.interface";
import { PrismaPaymentRepository } from "./prisma";

export const getPaymentRepository = (): PaymentRepository => PrismaPaymentRepository;
