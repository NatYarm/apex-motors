'use client';

import Link from 'next/link';

import { useInventoryFilters } from '../inventory/useInventoryFilters';
import { Button } from '../ui/button';

import { routes } from '@/config/routes';
import { env } from '@/env.mjs';

export const SearchButton = ({ count }: { count: number }) => {
  const { queryStates } = useInventoryFilters();
  const { make, model, modelVariant, minYear, maxYear, minPrice, maxPrice } =
    queryStates;

  const queryParams = new URLSearchParams();

  if (make) queryParams.append('make', make);
  if (model) queryParams.append('model', model);
  if (modelVariant) queryParams.append('modelVariant', modelVariant);
  if (minYear) queryParams.append('minYear', minYear);
  if (maxYear) queryParams.append('maxYear', maxYear);
  if (minPrice) queryParams.append('minPrice', minPrice);
  if (maxPrice) queryParams.append('maxPrice', maxPrice);

  const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);

  url.search = queryParams.toString();

  return (
    <Button className="w-full" asChild>
      <Link href={url.toString()} className="text-white">
        Search {count > 0 ? `(${count})` : null}
      </Link>
    </Button>
  );
};
