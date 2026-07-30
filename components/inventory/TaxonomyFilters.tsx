'use client';

import { useEffect, useState } from 'react';

// import { Label } from '../ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

import { CustomSelect } from '../shared/CustomSelect';

import { endpoints } from '@/config/endpoints';
import { FilterProps, TaxonomyResponse } from '@/config/types';
import { api } from '@/lib/api-client';

export const TaxonomyFilters = ({
  handleChange,
  searchParams,
}: FilterProps) => {
  const [taxonomy, setTaxonomy] = useState<TaxonomyResponse>({
    makes: [],
    models: [],
    modelVariants: [],
  });

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();

      for (const [k, v] of Object.entries(
        searchParams as Record<string, string>,
      )) {
        if (v) params.set(k, v as string);
      }

      const url = new URL(endpoints.taxonomy, window.location.href);

      url.search = params.toString();

      const data = await api.get<TaxonomyResponse>(url.toString());

      setTaxonomy(data);
    })();
  }, [searchParams]);

  return (
    <>
      <CustomSelect
        label="Make"
        name="make"
        value={searchParams?.make as string}
        options={taxonomy.makes}
        onChange={handleChange}
      />
      <CustomSelect
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={taxonomy.models}
        onChange={handleChange}
        disabled={!taxonomy.models.length}
      />
      <CustomSelect
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={taxonomy.modelVariants}
        onChange={handleChange}
        disabled={!taxonomy.modelVariants.length}
      />
    </>
  );
};
