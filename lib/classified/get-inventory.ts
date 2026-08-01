import { prisma } from '../prisma';

import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { AwaitedPageProps } from '@/config/types';
import { Prisma } from '@/generated/prisma/client';
import { PageSchema } from '@/schemas/page-schema';

export const getInventory = async (
  searchParams: AwaitedPageProps['searchParams'],
  where: Prisma.ClassifiedWhereInput,
) => {
  const validPage = PageSchema.parse(searchParams?.page);

  // get current page
  const page = validPage ?? 1;

  // calc the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    where,
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};
