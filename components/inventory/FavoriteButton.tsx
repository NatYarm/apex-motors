'use client';

import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

import { endpoints } from '@/config/endpoints';
import { api } from '@/lib/api-client';
import { cn } from '@/lib/utils';

type FavoriteButtonProps = {
  id: number;
  setIsFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
};

export const FavoriteButton = ({
  id,
  setIsFavorite,
  isFavorite,
}: FavoriteButtonProps) => {
  const router = useRouter();

  const handleFavorite = async () => {
    const { ids } = await api.post<{ ids: number[] }>(endpoints.favorites, {
      json: { id },
    });

    if (ids.includes(id)) setIsFavorite(true);
    else setIsFavorite(false);
    setTimeout(() => router.refresh(), 250);
  };

  return (
    <Button
      onClick={handleFavorite}
      variant="ghost"
      size="icon"
      className={cn(
        'absolute top-2.5 left-3.5 rounded-full z-10 group h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10',
        isFavorite ? 'bg-white' : 'bg-muted/15',
      )}
    >
      <HeartIcon
        className={cn(
          'duration-200 transition-colors ease-in-out w-4 h-4 xl:w-6 xl:h-6 text-white',
          isFavorite
            ? 'text-pink-500 fill-pink-500'
            : 'group-hover:text-pink-500 group-hover:fill-pink-500',
        )}
      />
    </Button>
  );
};
