import { AwaitedPageProps } from '@/config/types';
import type { Prisma } from '@/generated/prisma/client';
import {
  BodyType,
  ClassifiedStatus,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
} from '@/generated/prisma/enums';
import { ClassifiedFiterSchema } from '@/schemas/classified-filter-schema';

export const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps['searchParams'] | undefined,
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedFiterSchema.safeParse(searchParams);

  if (!data) return { status: ClassifiedStatus.LIVE };

  const keys = Object.keys(data);

  const taxonomyFilters = ['make', 'model', 'modelVariant'] as const;

  type TaxonomyField = (typeof taxonomyFilters)[number];
  type RangeField = 'year' | 'price' | 'odoReading';
  type NumericField = 'doors' | 'seats';
  type EnumField =
    'odoUnit' | 'currency' | 'transmission' | 'color' | 'bodyType' | 'fuelType';
  type RangeConstraint = { gte?: number; lte?: number };
  type EnumFilterValueMap = {
    odoUnit: OdoUnit;
    currency: CurrencyCode;
    transmission: Transmission;
    color: Color;
    bodyType: BodyType;
    fuelType: FuelType;
  };
  type FilterAccumulator = Partial<Record<RangeField, RangeConstraint>> &
    Partial<Record<TaxonomyField, { id: number }>> &
    Partial<Record<NumericField, number>> &
    Partial<EnumFilterValueMap>;

  const isTaxonomyField = (key: string): key is TaxonomyField => {
    return taxonomyFilters.includes(key as TaxonomyField);
  };

  const rangeFilters = {
    minYear: 'year',
    maxYear: 'year',
    minPrice: 'price',
    maxPrice: 'price',
    minReading: 'odoReading',
    maxReading: 'odoReading',
  } as const;

  const numFilters = ['seats', 'doors'] as const;
  const enumFilters = [
    'odoUnit',
    'currency',
    'transmission',
    'color',
    'bodyType',
    'fuelType',
  ] as const;

  const isNumericField = (key: string): key is NumericField => {
    return numFilters.includes(key as NumericField);
  };

  const isEnumField = (key: string): key is EnumField => {
    return enumFilters.includes(key as EnumField);
  };

  const enumFilterValues: { [K in EnumField]: readonly string[] } = {
    odoUnit: Object.values(OdoUnit),
    currency: Object.values(CurrencyCode),
    transmission: Object.values(Transmission),
    color: Object.values(Color),
    bodyType: Object.values(BodyType),
    fuelType: Object.values(FuelType),
  };

  const mapParamsToFields = keys.reduce<FilterAccumulator>((acc, key) => {
    const value = searchParams?.[key] as string | undefined;

    if (!value) return acc;

    if (key in rangeFilters) {
      const field = rangeFilters[key as keyof typeof rangeFilters];
      const parsedValue = Number(value);

      if (Number.isNaN(parsedValue)) return acc;

      const existingFieldFilter = acc[field] ?? {};
      const nextFieldFilter = key.startsWith('min')
        ? { ...existingFieldFilter, gte: parsedValue }
        : { ...existingFieldFilter, lte: parsedValue };

      return {
        ...acc,
        [field]: nextFieldFilter,
      };
    }

    if (isTaxonomyField(key)) {
      const id = Number(value);

      if (Number.isNaN(id)) return acc;

      return {
        ...acc,
        [key]: { id },
      };
    }

    if (isNumericField(key)) {
      const parsedValue = Number(value);

      if (Number.isNaN(parsedValue)) return acc;

      return {
        ...acc,
        [key]: parsedValue,
      };
    }

    if (isEnumField(key)) {
      const normalizedValue = value.toUpperCase();

      if (!enumFilterValues[key].includes(normalizedValue)) return acc;

      return {
        ...acc,
        [key]: normalizedValue as EnumFilterValueMap[typeof key],
      };
    }

    return acc;
  }, {});

  return {
    status: ClassifiedStatus.LIVE,
    ...(data.q && {
      OR: [
        {
          title: {
            contains: data.q as string,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: data.q as string,
            mode: 'insensitive',
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};
