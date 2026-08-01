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
}

export const RangeSelect = ({
  label,
  minSelect,
  maxSelect,
}: RangeSelectProps) => {
  const minId = `${label}-${minSelect.name}`;
  const maxId = `${label}-${maxSelect.name}`;

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
        className="text-sm font-semibold mb-1 text-muted-foreground"
      >
        {label}
      </Label>
      <div className=" flex gap-2">
        <Select
          value={minSelect.value}
          onValueChange={(value) => minSelect.onChange(minSelect.name, value)}
        >
          <SelectTrigger
            className="cursor-pointer flex-1 border-border"
            id={minId}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="" className="h-7" />
            {uniqueMinOptions.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
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
            className="cursor-pointer flex-1 border-border"
            id={maxId}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="" className="h-7" />
            {uniqueMaxOptions.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
