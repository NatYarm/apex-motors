import type { PropsWithChildren } from 'react';

import { AdminHeader } from '@/components/layouts/admin-header';
import { AdminSidebar } from '@/components/layouts/admin-sidebar';
import { RefreshOnFocus } from '@/components/shared/RefreshOnFocus';

export default async function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <RefreshOnFocus />
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="admin-scrollbar flex flex-1 flex-col gap-4 p-4 md:gap-8 md:px-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
