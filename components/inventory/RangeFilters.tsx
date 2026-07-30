'use client';

import { useMemo } from 'react';

import { RangeSelect } from '../shared/RangeSelect';

import { FilterOptions, FilterProps } from '@/config/types';
import { CurrencyCode } from '@/generated/prisma/enums';
import { formatNumber, formatPrice, getRoundedRangeBounds } from '@/lib/utils';

interface RangeFilterProps extends FilterProps {
  label: string;
  minName: string;
  maxName: string;
  defaultMin: number;
  defaultMax: number;
  increment?: number;
  thousandSeparator?: boolean;
  currency?: { currencyCode: CurrencyCode };
}

type RangeFilterOptions = {
  minOptions: FilterOptions<string, number>;
  maxOptions: FilterOptions<string, number>;
};

export const RangeFilters = ({
  label,
  minName,
  maxName,
  defaultMin,
  defaultMax,
  increment,
  thousandSeparator,
  currency,
  handleChange,
  searchParams,
}: RangeFilterProps) => {
  const initialState = useMemo(() => {
    const state: FilterOptions<string, number> = [];
    const { min, max } = getRoundedRangeBounds(
      defaultMin,
      defaultMax,
      increment,
    );
    const step = increment ?? 1;
    const pushOption = (value: number) => {
      if (currency) {
        state.push({
          label: formatPrice({
            price: value,
            currency: currency.currencyCode,
          }),
          value,
        });

        return;
      }

      if (thousandSeparator) {
        state.push({ label: formatNumber(value), value });

        return;
      }

      state.push({ label: value.toString(), value });
    };

    for (let iterator = min; iterator <= max; iterator += step) {
      pushOption(iterator);
    }

    if (state.at(-1)?.value !== max) {
      pushOption(max);
    }

    return state;
  }, [defaultMin, defaultMax, increment, currency, thousandSeparator]);

  const options = useMemo<RangeFilterOptions>(() => {
    const minRaw = searchParams?.[minName];
    const maxRaw = searchParams?.[maxName];
    const minValue = minRaw ? Number(minRaw) : null;
    const maxValue = maxRaw ? Number(maxRaw) : null;

    const minOptions = Number.isFinite(maxValue)
      ? initialState.filter(({ value }) => value < (maxValue as number))
      : initialState;

    const maxOptionsBase = Number.isFinite(minValue)
      ? initialState.filter(({ value }) => value > (minValue as number))
      : initialState;

    return {
      minOptions,
      maxOptions: [...maxOptionsBase].reverse(),
    };
  }, [initialState, maxName, minName, searchParams]);

  return (
    <RangeSelect
      label={label}
      minSelect={{
        name: minName,
        value: (searchParams?.[minName] as string) || '',
        onChange: handleChange,
        options: options.minOptions,
      }}
      maxSelect={{
        name: maxName,
        value: (searchParams?.[maxName] as string) || '',
        onChange: handleChange,
        options: options.maxOptions,
      }}
    />
  );
};
