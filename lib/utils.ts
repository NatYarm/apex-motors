import { clsx, type ClassValue } from 'clsx';
import debounce from 'debounce';
import { twMerge } from 'tailwind-merge';

import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
} from '@/generated/prisma/enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (
  num: number | null,
  options?: Intl.NumberFormatOptions,
) => {
  if (!num) return '0';

  return new Intl.NumberFormat('en-GB', options).format(num);
};

export const getRoundedRangeBounds = (
  min: number,
  max: number,
  increment?: number,
) => {
  if (!increment) {
    return { min, max };
  }

  const lowerUnit = Math.max(1, increment / 10);
  const roundedMin = Math.floor(min / lowerUnit) * lowerUnit;
  const roundedMax = Math.ceil(max / increment) * increment;

  return {
    min: roundedMin,
    max: Math.max(roundedMin, roundedMax),
  };
};

interface FormatPriceArgs {
  price: number | null;
  currency: CurrencyCode | null;
}

export function formatPrice({ price, currency }: FormatPriceArgs) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });

  return formatter.format(price / 10);
}

export const formatOdoUnit = (unit: OdoUnit) => {
  return unit === OdoUnit.MILES ? 'mi' : 'km';
};

export const formatTransmission = (transmission: Transmission) => {
  return transmission === Transmission.AUTOMATIC ? 'Automatic' : 'Manual';
};

export const formatFuelType = (fuelType: FuelType) => {
  switch (fuelType) {
    case FuelType.PETROL:
      return 'Petrol';
    case FuelType.DIESEL:
      return 'Diesel';
    case FuelType.ELECTRIC:
      return 'Electric';
    case FuelType.HYBRID:
      return 'Hybrid';
    default:
      return 'Unknown';
  }
};

export const formatColor = (color: Color) => {
  switch (color) {
    case Color.BLACK:
      return 'Black';
    case Color.BLUE:
      return 'Blue';
    case Color.BROWN:
      return 'Brown';
    case Color.WHITE:
      return 'White';
    case Color.GREEN:
      return 'Green';
    case Color.GRAY:
      return 'Gray';
    case Color.ORANGE:
      return 'Orange';
    case Color.GOLD:
      return 'Gold';
    case Color.YELLOW:
      return 'Yellow';
    case Color.PINK:
      return 'Pink';
    case Color.PURPLE:
      return 'Purple';
    case Color.RED:
      return 'Red';
    case Color.SILVER:
      return 'Silver';
    default:
      return 'Unknown';
  }
};

export const formatBodyType = (bodyType: BodyType) => {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return 'Convertible';
    case BodyType.COUPE:
      return 'Coupe';
    case BodyType.HATCHBACK:
      return 'Hatchback';
    case BodyType.MPV:
      return 'MPV';
    case BodyType.ROADSTER:
      return 'Roadster';
    case BodyType.SEDAN:
      return 'Sedan';
    case BodyType.SUV:
      return 'SUV';
  }
};

export const debounceFunc = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  opts?: { immediate?: boolean },
) => {
  return debounce(func, wait, opts);
};
