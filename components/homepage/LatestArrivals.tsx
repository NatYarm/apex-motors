import { LatestArrivalsCarousel } from './LatestArrivalsCarousel';

import { Favorites } from '@/config/types';
import { ClassifiedStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

export const LatestArrivals = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId || '');

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="mb-2 uppercase text-2xl font-bold tracking-tight ">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favorites={favorites ? favorites.ids : []}
        />
      </div>
    </section>
  );
};
