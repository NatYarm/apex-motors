import {
  Car,
  CarFrontIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  PaintbrushVertical,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { HTMLParser } from '../shared/HTMLParser';
import { Button } from '../ui/button';

import { ClassifiedCarousel } from './ClassifiedCarousel';

import { routes } from '@/config/routes';
import { MultiStepFormEnum } from '@/config/types';
import { Prisma } from '@/generated/prisma/client';
import {
  formatBodyType,
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdoUnit,
  formatPrice,
  formatTransmission,
} from '@/lib/utils';

type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { make: true; images: true };
}>;

export const ClassifiedView = ({
  images,
  make,
  title,
  year,
  odoReading,
  odoUnit,
  color,
  fuelType,
  description,
  price,
  currency,
  slug,
  bodyType,
  vrm,
  doors,
  seats,
  transmission,
}: ClassifiedWithImagesAndMake) => {
  const features = [
    {
      id: 1,
      icon: <Fingerprint className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: vrm,
    },
    {
      id: 2,
      icon: <Car className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: formatBodyType(bodyType),
    },
    {
      id: 3,
      icon: <FuelIcon className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: formatFuelType(fuelType),
    },
    {
      id: 4,
      icon: <PowerIcon className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: formatTransmission(transmission),
    },
    {
      id: 5,
      icon: <GaugeIcon className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: `${formatNumber(odoReading)} ${formatOdoUnit(odoUnit)}`,
    },
    {
      id: 6,
      icon: <UsersIcon className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: seats,
    },
    {
      id: 7,
      icon: <CarFrontIcon className="w-6 h-6 mx-auto text-foreground-muted" />,
      label: doors,
    },
    {
      id: 8,
      icon: (
        <PaintbrushVertical className="w-6 h-6 mx-auto text-foreground-muted" />
      ),
      label: formatColor(color),
    },
  ];

  return (
    <div className="flex flex-col container mx-auto px-4 md:px-0 py-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <ClassifiedCarousel images={images} />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <Image
              src={make.image}
              alt={make.name}
              className="w-20 mr-4"
              width={120}
              height={120}
            />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          <div className="mt-4 flex items-center space-x-2 mb-2">
            <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-0.5 rounded-md">
              {year}
            </span>
            <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-0.5 rounded-md">
              {formatNumber(odoReading)} {formatOdoUnit(odoUnit)}
            </span>

            <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-0.5 rounded-md">
              {formatColor(color)}
            </span>
            <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-0.5 rounded-md">
              {formatFuelType(fuelType)}
            </span>
          </div>
          {description && (
            <div className="mb-4">
              <HTMLParser html={description} />
            </div>
          )}
          <div className="text-4xl font-bold my-4 w-full border border-muted-foreground flex-center rounded-lg py-10">
            Our price: {formatPrice({ price, currency })}
          </div>
          <Button
            size="lg"
            asChild
            className="uppercase font-bold py-3 px-6 rounded w-full mb-4"
          >
            <Link href={routes.reserve(slug, MultiStepFormEnum.WELCOME)}>
              Reserve Now
            </Link>
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-accent rounded-md shadow-xs p-3 text-center"
              >
                {feature.icon}
                <p className="text-sm font-medium mt-1">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
