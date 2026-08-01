import { InventorySkeleton } from '@/components/inventory/InventorySkeleton';

export default function FavoritesLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[80dhv]">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Classifieds</h1>
      <InventorySkeleton />
    </div>
  );
}
