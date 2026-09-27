import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

import { prisma } from '../prisma';

import { ClassifiedStatus } from '@/generated/prisma/enums';

export async function getChartData() {
  const now = new Date();
  const monthsData = [];

  for (let i = 0; i < 12; i++) {
    const startDate = startOfMonth(subMonths(now, i));
    const endDate = endOfMonth(startDate);

    const monthlySales = await prisma.classified.aggregate({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        price: true,
      },
    });

    monthsData.unshift({
      month: format(startDate, 'MMM'),
      sales: monthlySales._sum.price || 0,
    });
  }

  return monthsData;
}

export type ChartDataType = ReturnType<typeof getChartData>;
