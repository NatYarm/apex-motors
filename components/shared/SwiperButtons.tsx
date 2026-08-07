import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '../ui/button';

import { cn } from '@/lib/utils';

interface SwiperButtonsProps {
  prevClassName?: string;
  nextClassName?: string;
}

export const SwiperButtons = ({
  prevClassName,
  nextClassName,
}: SwiperButtonsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        type="button"
        rel="prev"
        size="icon"
        className={cn(
          prevClassName,
          'swiper-button-prev absolute top-1/2 -translate-y-1/2 active:-translate-y-1/2! z-10 flex items-center rounded-full shadow-sm transition-transform hover:bg-gray-200! hover:shadow-md active:scale-95 active:shadow-sm',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ChevronLeft className="h-8 w-8 text-black" />
      </Button>

      <Button
        variant="ghost"
        type="button"
        rel="next"
        size="icon"
        className={cn(
          nextClassName,
          'swiper-button-next absolute top-1/2 -translate-y-1/2 active:-translate-y-1/2! z-10 flex items-center rounded-full shadow-sm transition-transform hover:bg-gray-200! hover:shadow-md active:scale-95 active:shadow-sm',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ChevronRight className="h-8 w-8 text-black" />
      </Button>
    </>
  );
};
