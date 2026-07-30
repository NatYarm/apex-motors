'use client';

import { InventoryFiltersContent } from './InventoryFiltersContent';
import { useInventoryFilters } from './useInventoryFilters';

import { SidebarProps } from '@/config/types';
import { cn } from '@/lib/utils';

export const Sidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const { filterCount, clearFilters } = useInventoryFilters();

  return (
    <div className="py-4 w-75 xl:w-80 border-r border-muted hidden lg:block">
      <div className=" font-semibold flex-between px-4">
        <span>Filters</span>
        <button
          type="button"
          onClick={clearFilters}
          aria-disabled={!filterCount}
          className={cn(
            'text-sm text-muted-foreground py-1',
            !filterCount
              ? 'disabled opacity-50 pointer-events-none cursor-default'
              : 'hover:underline cursor-pointer',
          )}
        >
          Clear all {filterCount ? `(${filterCount})` : null}
        </button>
      </div>
      <div className="p-4 space-y-3">
        <InventoryFiltersContent
          minMaxValues={minMaxValues}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};
