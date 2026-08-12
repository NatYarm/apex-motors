import Link from 'next/link';

import { Button } from '../ui/button';

import { HomepageFilters } from '@/components/homepage/HomepageFilters';
import { SearchButton } from '@/components/homepage/SearchButton';
import { imageSources } from '@/config/constants';
import { routes } from '@/config/routes';
import { AwaitedPageProps } from '@/config/types';
import { buildClassifiedFilterQuery } from '@/lib/classified/classified-filter-query';
import { getInventoryCount } from '@/lib/classified/get-inventory-count';
import { getInventoryMinMaxValues } from '@/lib/classified/get-inventory-min-max-values';
import { imgixLoader } from '@/lib/imgix-loader';

export const HeroSection = async ({ searchParams }: AwaitedPageProps) => {
  const totalFiltersApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFiltersApplied > 0;
  const where = buildClassifiedFilterQuery(searchParams);

  const classifiedsCount = await getInventoryCount(where);

  const minMaxResult = await getInventoryMinMaxValues();

  return (
    <section
      className="relative flex items-center justify-center h-[calc(100vh-4rem)] bg-cover bg-center"
      style={{
        backgroundImage: `url(${imgixLoader({ src: imageSources.carLineup, width: 1280, quality: 100 })})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-65" />
      <div className="container lg:grid space-y-12 grid-cols-2 items-center relative z-10">
        <div className="px-10">
          <h1 className="text-3xl text-center lg:text-left md:text-4xl lg:text-8xl uppercase font-extrabold text-white">
            Unbeatable Deals on New & Used Cars
          </h1>
          <h2 className="mt-4 uppercase text-center lg:text-left text-base md:text-3xl lg:text-4xl text-white">
            Discover your dream car today
          </h2>
        </div>
        <div className="max-w-100 w-full mx-auto p-6 bg-white rounded-xl shadow-lg ">
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col w-full gap-x-4">
              <HomepageFilters
                searchParams={searchParams}
                minMaxValues={minMaxResult}
              />
            </div>
            <SearchButton count={classifiedsCount} />
            {isFilterApplied && (
              <Button
                asChild
                variant="outline"
                className="w-full dark:border-muted-foreground dark:bg-accent-foreground dark:text-muted"
              >
                <Link href={routes.home}>
                  Clear Filters ({totalFiltersApplied})
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
