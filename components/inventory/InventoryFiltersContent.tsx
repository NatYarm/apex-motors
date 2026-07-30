import { CustomSelect } from '../shared/CustomSelect';
import { SearchInput } from '../shared/SearchInput';

import { RangeFilters } from './RangeFilters';
import { TaxonomyFilters } from './TaxonomyFilters';
import { useInventoryFilters } from './useInventoryFilters';

import { SidebarProps } from '@/config/types';
import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
} from '@/generated/prisma/enums';
import {
  formatBodyType,
  formatColor,
  formatFuelType,
  formatOdoUnit,
  formatTransmission,
} from '@/lib/utils';

export const InventoryFiltersContent = ({
  minMaxValues,
  searchParams,
}: SidebarProps) => {
  const { _min, _max } = minMaxValues;
  const { queryStates, handleChange } = useInventoryFilters();

  return (
    <>
      <SearchInput
        placeholder="Search classifieds..."
        className="w-full focus:outline-hidden"
      />

      <TaxonomyFilters
        searchParams={searchParams}
        handleChange={handleChange}
      />

      <RangeFilters
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMin={_min.year || 1925}
        defaultMax={_max.year || new Date().getFullYear()}
        handleChange={handleChange}
        searchParams={searchParams}
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
      <RangeFilters
        label="Odometer Reading"
        minName="minReading"
        maxName="maxReading"
        defaultMin={_min.odoReading || 0}
        defaultMax={_max.odoReading || 1000000}
        handleChange={handleChange}
        searchParams={searchParams}
        increment={10000}
        thousandSeparator
      />

      <CustomSelect
        label="Currency"
        name="currency"
        onChange={handleChange}
        value={queryStates.currency || ''}
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
      />
      <CustomSelect
        label="Odometer Unit"
        name="odoUnit"
        onChange={handleChange}
        value={queryStates.odoUnit || ''}
        options={Object.values(OdoUnit).map((value) => ({
          label: formatOdoUnit(value),
          value,
        }))}
      />
      <CustomSelect
        label="Transmission"
        name="transmission"
        onChange={handleChange}
        value={queryStates.transmission || ''}
        options={Object.values(Transmission).map((value) => ({
          label: formatTransmission(value),
          value,
        }))}
      />
      <CustomSelect
        label="Fuel Type"
        name="fuelType"
        onChange={handleChange}
        value={queryStates.fuelType || ''}
        options={Object.values(FuelType).map((value) => ({
          label: formatFuelType(value),
          value,
        }))}
      />
      <CustomSelect
        label="Body Type"
        name="bodyType"
        onChange={handleChange}
        value={queryStates.bodyType || ''}
        options={Object.values(BodyType).map((value) => ({
          label: formatBodyType(value),
          value,
        }))}
      />
      <CustomSelect
        label="Color"
        name="color"
        onChange={handleChange}
        value={queryStates.color || ''}
        options={Object.values(Color).map((value) => ({
          label: formatColor(value),
          value,
        }))}
      />
      <CustomSelect
        label="Doors"
        name="doors"
        onChange={handleChange}
        value={queryStates.doors || ''}
        options={Array.from({ length: 6 }).map((_, i) => ({
          label: Number(i + 1).toString(),
          value: Number(i + 1).toString(),
        }))}
      />
      <CustomSelect
        label="Seats"
        name="seats"
        onChange={handleChange}
        value={queryStates.seats || ''}
        options={Array.from({ length: 8 }).map((_, i) => ({
          label: Number(i + 1).toString(),
          value: Number(i + 1).toString(),
        }))}
      />
    </>
  );
};
