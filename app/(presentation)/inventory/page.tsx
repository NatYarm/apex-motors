import { buildClassifiedFilterQuery } from './lib/classified-filter-query';

import { ClassifiedList } from '@/components/inventory/ClassifiedList';
import { DialogFilters } from '@/components/inventory/DialogFilters';
import { Sidebar } from '@/components/inventory/Sidebar';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import { AwaitedPageProps, Favorites, PageProps } from '@/config/types';
import { ClassifiedStatus, Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';
import { PageSchema } from '@/schemas/page-schema';

const getInventory = async (
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

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const where = buildClassifiedFilterQuery(searchParams);
  const classifieds = await getInventory(searchParams, where);
  const count = await prisma.classified.count({ where });

  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? '');
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      year: true,
      price: true,
      odoReading: true,
    },
  });

  return (
    <div className="flex">
      <Sidebar minMaxValues={minMaxResult} searchParams={searchParams} />

      <div className="flex-1 p-4">
        <div className="flex-center flex-col space-y-2  ">
          <div className="flex-between w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold fin-w-fit">
              We have found {count} classifieds
            </h2>
            <DialogFilters
              minMaxValues={minMaxResult}
              searchParams={searchParams}
              count={count}
            />
          </div>

          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: 'hidden lg:flex  justify-end',
              paginationPrev: '',
              paginationNext: '',
              paginationLink: 'border border-transparent',
              paginationLinkActive:
                'data-[active=true]:border-border data-[active=true]:bg-muted',
            }}
          />

          <ClassifiedList
            classifieds={classifieds}
            favorites={favorites?.ids ?? []}
          />
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: 'flex lg:hidden justify-center pt-4',
              paginationPrev: '',
              paginationNext: '',
              paginationLink: 'border border-transparent',
              paginationLinkActive:
                'data-[active=true]:border-border data-[active=true]:bg-muted',
            }}
          />
        </div>
      </div>
    </div>
  );
}
