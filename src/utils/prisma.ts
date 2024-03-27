import { PrismaClient } from "@prisma/client";

export const onSession = async <T>(callback: (manager: PrismaClient) => Promise<T>): Promise<T> => {
  const prisma = new PrismaClient();
  try {
    const response = await callback(prisma);
    return response;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
