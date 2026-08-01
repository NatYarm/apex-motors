import { ClassifiedCardSkeleton } from './ClassifiedCardSkeleton';

export const InventorySkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[80dhv]">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, idx) => idx + 1).map((id) => (
          <ClassifiedCardSkeleton key={id} />
        ))}
      </div>
    </div>
  );
};
