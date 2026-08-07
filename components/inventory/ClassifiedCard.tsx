'use client';

import { useState } from 'react';

import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HTMLParser } from '../shared/HTMLParser';
import { Button, buttonVariants } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ImgixImage } from '../ui/imgix-image';

import { FavoriteButton } from './FavoriteButton';

import { routes } from '@/config/routes';
import { ClassifiedWithImages, MultiStepFormEnum } from '@/config/types';
import {
  formatColor,
  formatFuelType,
  formatOdoUnit,
  formatTransmission,
} from '@/lib/utils';
import { formatNumber, formatPrice } from '@/lib/utils';

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favorites: number[];
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: 'odoReading',
      icon: <GaugeCircle className="w-4 h-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdoUnit(classified.odoUnit)}`,
    },
    {
      id: 'transmission',
      icon: <Cog className="w-4 h-4" />,
      value: classified?.transmission
        ? formatTransmission(classified.transmission)
        : null,
    },
    {
      id: 'fuelType',
      icon: <Fuel className="w-4 h-4" />,
      value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
    },
    {
      id: 'color',
      icon: <Paintbrush2 className="w-4 h-4" />,
      value: classified?.color ? formatColor(classified.color) : null,
    },
  ];
};

export const ClassifiedCard = ({
  classified,
  favorites,
}: ClassifiedCardProps) => {
  const pathname = usePathname();
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(classified.id),
  );

  const isVisible = !(pathname === routes.favorites && !isFavorite);

  if (!isVisible) return null;

  return (
    <Card className="pt-0">
      <div className="aspect-3/2 relative overflow-hidden">
        <Link href={routes.singleClassified(classified.slug)}>
          <ImgixImage
            placeholder="blur"
            blurDataURL={classified.images[0]?.blurhash}
            src={classified.images[0]?.src}
            alt={classified.images[0]?.alt}
            className="object-cover"
            fill
            quality={25}
          />
        </Link>
        <FavoriteButton
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          id={classified.id}
        />
        <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
          <p className="text-xs lg:text-base font-semibold">
            {formatPrice({
              price: classified.price,
              currency: classified.currency,
            })}
          </p>
        </div>
      </div>
      <CardContent>
        <Link
          href={routes.singleClassified(classified.slug)}
          className="text-sm md:text-base lg:text-lg font-heading font-bold line-clamp-1 transition-colors hover:text-primary mb-1"
        >
          {classified.title}
        </Link>

        {classified?.description && (
          <div className="text-xs md:text-sm  text-muted-foreground line-clamp-2 mb-3">
            <HTMLParser html={classified.description} />
            &nbsp;
            {/* Used for equal spacing across each card in the grid */}
          </div>
        )}

        <ul className="text-xs md:text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 w-full">
          {getKeyClassifiedInfo(classified)
            .filter((v) => v.value)
            .map(({ id, icon, value }) => (
              <li
                key={id}
                className="font-semibold flex items-center gap-x-1.5"
              >
                {icon} {value}
              </li>
            ))}
        </ul>
      </CardContent>

      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2 px-4 w-full ">
        <Button variant="outline" className="w-full lg:w-auto lg:flex-1">
          <Link
            href={routes.reserve(classified.slug, MultiStepFormEnum.WELCOME)}
          >
            Reserve
          </Link>
        </Button>
        <Link
          href={routes.singleClassified(classified.slug)}
          className={buttonVariants({
            className: 'w-full lg:w-auto lg:flex-1',
          })}
        >
          View Details
        </Link>
      </div>
    </Card>
  );
};
