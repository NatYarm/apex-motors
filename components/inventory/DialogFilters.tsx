'use client';

import { useState } from 'react';

import { Settings2 } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { InventoryFiltersContent } from './InventoryFiltersContent';
import { useInventoryFilters } from './useInventoryFilters';

import { SidebarProps } from '@/config/types';
import { cn } from '@/lib/utils';

interface DialogFiltersProps extends SidebarProps {
  count: number;
}

export const DialogFilters = ({
  minMaxValues,
  searchParams,

  count,
}: DialogFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filterCount, clearFilters } = useInventoryFilters();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Settings2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-106 h-[90vh] rounded-xl p-6 scrollbar">
        <div className="flex-between">
          <DialogTitle className="font-semibold">Filters</DialogTitle>
        </div>
        <div className="space-y-3">
          <InventoryFiltersContent
            minMaxValues={minMaxValues}
            searchParams={searchParams}
          />
        </div>
        <Button onClick={() => setIsOpen(false)} className="w-full">
          Search{count > 0 ? ` (${count})` : null}
        </Button>

        {filterCount > 0 && (
          <Button
            variant="outline"
            onClick={clearFilters}
            aria-disabled={!filterCount}
            className={cn(
              'text-sm py-1',
              !filterCount
                ? 'disabled opacity-50 pointer-events-none cursor-default'
                : 'hover:underline',
            )}
          >
            Clear all {filterCount ? `(${filterCount})` : null}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
