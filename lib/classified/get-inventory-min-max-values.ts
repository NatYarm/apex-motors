import { ClassifiedStatus } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export const getInventoryMinMaxValues = async () => {
  return prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  });
};
