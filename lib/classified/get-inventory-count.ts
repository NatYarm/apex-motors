import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export const getInventoryCount = async (
  where: Prisma.ClassifiedWhereInput,
): Promise<number> => {
  return prisma.classified.count({ where });
};
