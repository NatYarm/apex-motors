import { AdminClassifiedsHeader } from '@/components/admin/classifieds/ClassifiedsHeader';
import type { PageProps } from '@/config/types';

export default async function AdminClassifiedsPage(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <>
      <AdminClassifiedsHeader searchParams={searchParams} />
    </>
  );
}
