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

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: FilterOptions<string, string>;
  className?: string;
  disabled?: boolean;
}

export const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}: SelectProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={label}
          className="text-sm font-semibold text-muted-foreground"
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
        <SelectTrigger className="w-full cursor-pointer" id={label}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="" className="h-7" />
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </div>
  );
};
