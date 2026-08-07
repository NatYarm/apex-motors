import React from 'react';

import { CarIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

import { routes } from '@/config/routes';

export const EndButtons = () => {
  return (
    <div className="mt-6 flex-center gap-4">
      <Button
        asChild
        variant="outline"
        className="transition-colors hover:border-white hover:bg-primary hover:text-white"
      >
        <Link href={routes.home}>
          <HomeIcon className="mr-2 h-5 w-5" />
          Go to Homepage
        </Link>
      </Button>
      <Button asChild>
        <Link href={routes.inventory}>
          <CarIcon className="mr-2 h-5 w-5" />
          View Classifieds
        </Link>
      </Button>
    </div>
  );
};
