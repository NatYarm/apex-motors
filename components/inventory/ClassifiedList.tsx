'use client';

import { use } from 'react';

import { ClassifiedCard } from './ClassifiedCard';

import { ClassifiedWithImages } from '@/config/types';

interface ClassifiedListProps {
  classifieds: Promise<ClassifiedWithImages[]>;
  favorites: number[];
}

export const ClassifiedList = ({
  classifieds,
  favorites,
}: ClassifiedListProps) => {
  const inventory = use(classifieds);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {inventory.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favorites={favorites}
          />
        );
      })}
    </div>
  );
};
