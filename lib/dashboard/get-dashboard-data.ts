import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

import { ClassifiedStatus, CustomerStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { calculatePercentageChange } from '@/lib/utils';

export async function getDashboardData() {
  const now = new Date();
  const startOfThisMonth = startOfMonth(now);
  const endOfThisMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(subMonths(now, 1));

  const lastMonthPromises = {
    carsSoldThisMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    carsSoldLastMonth: prisma.classified.count({
      where: {
        status: ClassifiedStatus.SOLD,
        updatedAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
    newCustomersThisMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    newCustomersLastMonth: prisma.customer.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
    purchasedCustomersThisMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
      },
    }),
    purchasedCustomersLastMonth: prisma.customer.count({
      where: {
        status: CustomerStatus.PURCHASED,
        updatedAt: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
    }),
  };

  const salesThisMonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfThisMonth,
        lte: endOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const salesPreviousMonth = prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.SOLD,
      updatedAt: {
        gte: startOfLastMonth,
        lt: startOfThisMonth,
      },
    },
    _sum: { price: true },
  });

  const [
    carsSoldThisMonth,
    carsSoldLastMonth,
    newCustomersThisMonth,
    newCustomersLastMonth,
    purchasedCustomersThisMonth,
    purchasedCustomersLastMonth,
  ] = await Promise.all(Object.values(lastMonthPromises));

  const [salesCurMonth, salesPrevMonth] = await Promise.all([
    salesThisMonth,
    salesPreviousMonth,
  ]);

  const totalSales = salesCurMonth._sum.price || 0;
  const totalSalesPreviousMonth = salesPrevMonth._sum.price || 0;

  const salesPercentageChange = calculatePercentageChange(
    totalSales,
    totalSalesPreviousMonth,
  );

  const carsSoldPercentageChange = calculatePercentageChange(
    carsSoldThisMonth,
    carsSoldLastMonth,
  );

  const newCustomersPercentageChange = calculatePercentageChange(
    newCustomersThisMonth,
    newCustomersLastMonth,
  );

  const conversionRate =
    newCustomersThisMonth > 0
      ? purchasedCustomersThisMonth / newCustomersThisMonth
      : 0;

  const previousConversionRate =
    newCustomersLastMonth > 0
      ? purchasedCustomersLastMonth / newCustomersLastMonth
      : 0;

  const conversionRatePercentageChange = calculatePercentageChange(
    conversionRate,
    previousConversionRate,
  );

  return {
    totalSales,
    carsSoldThisMonth,
    carsSoldPercentageChange,
    newCustomersThisMonth,
    newCustomersPercentageChange,
    salesPercentageChange,
    conversionRate,
    conversionRatePercentageChange,
  };
}

export type DashboardDataType = ReturnType<typeof getDashboardData>;
