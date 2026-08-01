import { buildClassifiedFilterQuery } from './classified-filter-query';

import { ClassifiedStatus } from '@/generated/prisma/enums';

describe('buildClassifiedFilterQuery', () => {
  it('returns the base live-status filter when there are no params', () => {
    expect(buildClassifiedFilterQuery(undefined)).toEqual({
      status: ClassifiedStatus.LIVE,
    });
  });

  it('maps search text to case-insensitive title and description filters', () => {
    expect(buildClassifiedFilterQuery({ q: '911' })).toEqual({
      status: ClassifiedStatus.LIVE,
      OR: [
        {
          title: {
            contains: '911',
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: '911',
            mode: 'insensitive',
          },
        },
      ],
    });
  });

  it('maps taxonomy ids to relational id filters', () => {
    expect(
      buildClassifiedFilterQuery({
        make: '1',
        model: '12',
        modelVariant: '123',
      }),
    ).toMatchObject({
      make: { id: 1 },
      model: { id: 12 },
      modelVariant: { id: 123 },
    });
  });

  it('maps min and max range params to Prisma constraints', () => {
    expect(
      buildClassifiedFilterQuery({
        minYear: '2020',
        maxYear: '2024',
        minPrice: '100000',
        maxPrice: '250000',
        minReading: '10000',
        maxReading: '60000',
      }),
    ).toMatchObject({
      year: { gte: 2020, lte: 2024 },
      price: { gte: 100000, lte: 250000 },
      odoReading: { gte: 10000, lte: 60000 },
    });
  });

  it('maps numeric and enum filters, normalizing enum casing', () => {
    expect(
      buildClassifiedFilterQuery({
        doors: '4',
        seats: '5',
        currency: 'eur',
        odoUnit: 'miles',
        transmission: 'automatic',
        fuelType: 'electric',
        bodyType: 'suv',
        color: 'black',
      }),
    ).toMatchObject({
      doors: 4,
      seats: 5,
      currency: 'EUR',
      odoUnit: 'MILES',
      transmission: 'AUTOMATIC',
      fuelType: 'ELECTRIC',
      bodyType: 'SUV',
      color: 'BLACK',
    });
  });

  it('ignores invalid numeric, taxonomy, and enum values', () => {
    expect(
      buildClassifiedFilterQuery({
        make: 'abc',
        minYear: 'soon',
        doors: 'many',
        fuelType: 'steam',
      }),
    ).toEqual({
      status: ClassifiedStatus.LIVE,
    });
  });
});
