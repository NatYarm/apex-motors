'use client';

import { useMemo } from 'react';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { FilterOptions } from '@/config/types';
import { cn } from '@/lib/utils';

interface SelectType {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: FilterOptions<string, number>;
}

interface RangeSelectProps {
  label: string;
  minSelect: SelectType;
  maxSelect: SelectType;
  appearance?: 'default' | 'light';
}

export const RangeSelect = ({
  label,
  minSelect,
  maxSelect,
  appearance = 'default',
}: RangeSelectProps) => {
  const minId = `${label}-${minSelect.name}`;
  const maxId = `${label}-${maxSelect.name}`;
  const isLight = appearance === 'light';

  const uniqueMinOptions = useMemo(
    () =>
      Array.from(
        new Map(minSelect.options.map((opt) => [opt.value, opt])).values(),
      ),
    [minSelect.options],
  );

  const uniqueMaxOptions = useMemo(
    () =>
      Array.from(
        new Map(maxSelect.options.map((opt) => [opt.value, opt])).values(),
      ),
    [maxSelect.options],
  );

  return (
    <>
      <Label
        htmlFor={minId}

        className={cn(
          'text-sm font-semibold text-muted-foreground mb-1',
          isLight && 'dark:text-muted',
        )}
      >
        {label}
      </Label>
      <div className=" flex gap-2">
        <Select
          value={minSelect.value}
          onValueChange={(value) => minSelect.onChange(minSelect.name, value)}
        >
          <SelectTrigger
            className={cn(
              'flex-1 cursor-pointer border-border',
              isLight &&
                'dark:bg-white dark:text-muted  dark:hover:bg-slate-50',
            )}
            id={minId}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className={cn(isLight && 'dark:bg-white dark:text-muted')}
          >
            <SelectItem
              value=""
              className={cn(
                'h-7 cursor-pointer',
                isLight && 'dark:bg-white dark:focus:bg-slate-100',
              )}
            />
            {uniqueMinOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={String(opt.value)}
                className={cn(
                  'cursor-pointer',
                  isLight &&
                    ' dark:focus:bg-slate-100 dark:focus:**:text-muted',
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={maxSelect.value}
          onValueChange={(value) => maxSelect.onChange(maxSelect.name, value)}
        >
          <SelectTrigger
            className={cn(
              'flex-1 cursor-pointer border-border',
              isLight &&
                'dark:bg-white dark:text-muted  dark:hover:bg-slate-50',
            )}
            id={maxId}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent
            className={cn(isLight && 'dark:bg-white dark:text-muted')}
          >
            <SelectItem
              value=""
              className={cn(
                'h-7 cursor-pointer',
                isLight && 'dark:bg-white dark:focus:bg-slate-100',
              )}
            />
            {uniqueMaxOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={String(opt.value)}
                className={cn(
                  'cursor-pointer',
                  isLight &&
                    ' dark:focus:bg-slate-100 dark:focus:**:text-muted',
                )}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
