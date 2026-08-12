import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';
import { ClassifiedStatus } from '@/generated/prisma/enums';
import { getInventoryCount } from '@/lib/classified/get-inventory-count';
import { prisma } from '@/lib/prisma';

export const OurBrandsSection = async () => {
  const brands = await prisma.make.findMany({
    where: {
      name: {
        in: [
          'Aston Martin',
          'Porsche',
          'Lamborghini',
          'Audi',
          'Jaguar',
          'Land Rover',
          'Mercedes-Benz',
          'Ferrari',
          'Bentley',
          'Ford',
          'Volkswagen',
          'Maserati',
          'Lexus',
          'Bmw',
          'Volvo',
        ],
        mode: 'insensitive',
      },
    },
  });

  const count = getInventoryCount({ status: ClassifiedStatus.LIVE });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="px-6 lg:px-8 sm:text-center">
          <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight  sm:text-4xl">
            Our Brands
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We have {count} vehicles in stock, ready for same-day drive away.
          </p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map(({ id, image, name }) => (
            <Link
              key={id}
              href={`${routes.inventory}?make=${id}`}
              className="hover:scale-110 transition-all duration-100 ease-in-out relative h-24 flex items-center justify-center"
            >
              <Image
                src={image}
                alt={name}
                className="object-contain aspect-square"
                fill={true}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
