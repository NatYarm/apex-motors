import { ClassifiedCard } from '@/components/inventory/ClassifiedCard';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants';
import { routes } from '@/config/routes';
import { Favorites, PageProps } from '@/config/types';
import { getInventory } from '@/lib/classified/get-inventory';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';

export default async function FavoritesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? '');
  const where = { id: { in: favorites ? favorites.ids : [] } };

  const classifieds = await getInventory(searchParams, where);
  const count = await prisma.classified.count({ where });
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80dhv]">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Classifieds</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {classifieds.map((classified) => {
          return (
            <ClassifiedCard
              key={classified.id}
              classified={classified}
              favorites={favorites ? favorites.ids : []}
            />
          );
        })}
      </div>
      <div className="mt-6">
        <CustomPagination
          baseURL={routes.favorites}
          totalPages={totalPages}
          styles={{
            paginationRoot: '',
            paginationPrev: '',
            paginationNext: '',
            paginationLink: 'border border-transparent',
            paginationLinkActive:
              'data-[active=true]:border-border data-[active=true]:bg-muted',
          }}
        />
      </div>
    </div>
  );
}
