'use client';

import { parseAsString, useQueryStates } from 'nuqs';

export const useInventoryFilters = () => {
  const inventoryQueryParsers = {
    q: parseAsString.withDefault(''),
    make: parseAsString.withDefault(''),
    model: parseAsString.withDefault(''),
    modelVariant: parseAsString.withDefault(''),
    minYear: parseAsString.withDefault(''),
    maxYear: parseAsString.withDefault(''),
    minPrice: parseAsString.withDefault(''),
    maxPrice: parseAsString.withDefault(''),
    minReading: parseAsString.withDefault(''),
    maxReading: parseAsString.withDefault(''),
    currency: parseAsString.withDefault(''),
    odoUnit: parseAsString.withDefault(''),
    transmission: parseAsString.withDefault(''),
    fuelType: parseAsString.withDefault(''),
    bodyType: parseAsString.withDefault(''),
    color: parseAsString.withDefault(''),
    doors: parseAsString.withDefault(''),
    seats: parseAsString.withDefault(''),
  };
  const clearedFilters = Object.fromEntries(
    Object.keys(inventoryQueryParsers).map((key) => [key, null]),
  );
  const [queryStates, setQueryStates] = useQueryStates(inventoryQueryParsers, {
    shallow: false,
  });

  const filterCount = Object.values(queryStates).filter(Boolean).length;

  const clearFilters = () => {
    setQueryStates(clearedFilters);
  };

  const handleChange = (name: string, value: string) => {
    const nextState: Record<string, string | null> = {
      [name]: value || null,
    };

    if (name === 'make') {
      nextState.model = null;
      nextState.modelVariant = null;
    }

    if (name === 'model') {
      nextState.modelVariant = null;
    }

    setQueryStates(nextState);
  };

  return {
    queryStates,
    filterCount,
    clearFilters,
    handleChange,
  };
};
