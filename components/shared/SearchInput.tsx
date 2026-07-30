'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

import debounce from 'debounce';
import { SearchIcon, XIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Input } from '../ui/input';

import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput = ({ className, ...rest }: SearchInputProps) => {
  const [q, setSearch] = useQueryState('q', { shallow: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value || null);
      }, 1000),
    [setSearch],
  );

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== (q ?? '')) {
      inputRef.current.value = q ?? '';
    }
  }, [q]);

  useEffect(
    () => () => {
      handleSearch.clear();
    },
    [handleSearch],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    handleSearch(newValue);
  };

  const clearSearch = () => {
    handleSearch.clear();
    setSearch(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <form className="relative felx-1">
      <SearchIcon className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        defaultValue={q || ''}
        className={cn(className, 'pl-8')}
        type="text"
        onChange={onChange}
        {...rest}
      />

      {q && (
        <XIcon
          className="absolute right-2.5 top-2 h-4 w-4 p-0.5 text-muted-foreground cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </form>
  );
};
