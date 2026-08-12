'use client';

import { Label } from '../ui/label';
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { FilterOptions } from '@/config/types';
import { cn } from '@/lib/utils';

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: FilterOptions<string, string>;
  className?: string;
  disabled?: boolean;
  appearance?: 'default' | 'light';
}

export const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  appearance = 'default',
}: SelectProps) => {
  const isLight = appearance === 'light';

  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={label}
          className={cn(
            'text-sm font-semibold text-muted-foreground',
            isLight && 'dark:text-muted',
          )}
        >
          {label}
        </Label>
      )}
      <BaseSelect
        onValueChange={(value) => onChange(name, value)}
        value={value ?? ''}
        name={name}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'w-full cursor-pointer border-border',
            isLight && 'dark:bg-white dark:text-muted  dark:hover:bg-slate-50',
          )}
          id={label}
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
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className={cn(
                'cursor-pointer',
                isLight && ' dark:focus:bg-slate-100 dark:focus:**:text-muted',
              )}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </div>
  );
};
