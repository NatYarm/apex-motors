'use client';
import { usePathname } from 'next/navigation';

import { SearchInput } from '../shared/SearchInput';

export const AdminSearch = () => {
  const pathname = usePathname();

  return (
    <SearchInput
      placeholder={`Search ${pathname.split('/')[2]}...`}
      className="w-full focus-visible:ring-0 placeholder:text-muted-foreground text-muted-foreground appearance-none pl-8"
    />
  );
};
