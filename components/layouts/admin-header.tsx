import { AdminSearch } from '@/components/admin/AdminSearch';

export const AdminHeader = async () => {
  return (
    <header className="flex h-14 items-center gap-4">
      <div className="items-center flex-1 gap-4 md:gap-8 grid grid-cols-3 w-full px-4 md:px-6">
        <div className="col-span-1">
          <AdminSearch />
        </div>
      </div>
    </header>
  );
};
