'use client';

import { RangeFilters } from '../inventory/RangeFilters';
import { TaxonomyFilters } from '../inventory/TaxonomyFilters';
import { useInventoryFilters } from '../inventory/useInventoryFilters';

import { SidebarProps as HomepageFiltersProps } from '@/config/types';

export const HomepageFilters = ({
  searchParams,
  minMaxValues,
}: HomepageFiltersProps) => {
  const { handleChange } = useInventoryFilters();
  const { _min, _max } = minMaxValues;

  return (
    <>
      <TaxonomyFilters
        handleChange={handleChange}
        searchParams={searchParams}
        appearance="light"
      />
      <RangeFilters
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMin={_min.year || 1955}
        defaultMax={_max.year || new Date().getFullYear()}
        handleChange={handleChange}
        searchParams={searchParams}
        appearance="light"
      />
      <RangeFilters
        label="Price"
        minName="minPrice"
        maxName="maxPrice"
        defaultMin={_min.price || 0}
        defaultMax={_max.price || 2474836}
        handleChange={handleChange}
        searchParams={searchParams}
        increment={100000}
        thousandSeparator
        currency={{ currencyCode: 'EUR' }}
      />
    </>
  );
};
