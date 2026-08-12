import { Suspense } from 'react';

import { ClassifiedList } from '@/components/inventory/ClassifiedList';
import { DialogFilters } from '@/components/inventory/DialogFilters';
import { InventorySkeleton } from '@/components/inventory/InventorySkeleton';
import { Sidebar } from '@/components/inventory/Sidebar';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import { Favorites, PageProps } from '@/config/types';
import { buildClassifiedFilterQuery } from '@/lib/classified/classified-filter-query';
import { getInventory } from '@/lib/classified/get-inventory';
import { getInventoryCount } from '@/lib/classified/get-inventory-count';
import { getInventoryMinMaxValues } from '@/lib/classified/get-inventory-min-max-values';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const where = buildClassifiedFilterQuery(searchParams);

  const classifieds = getInventory(searchParams, where);
  const count = await getInventoryCount(where);
  const minMaxResult = await getInventoryMinMaxValues();

  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? '');
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

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
          <Suspense fallback={<InventorySkeleton />}>
            <ClassifiedList
              classifieds={classifieds}
              favorites={favorites?.ids ?? []}
            />
          </Suspense>

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
