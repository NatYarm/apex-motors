import { notFound, redirect } from 'next/navigation';

import { ClassifiedView } from '@/components/classified/ClassifiedView';
import { routes } from '@/config/routes';
import { PageProps } from '@/config/types';
import { ClassifiedStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

export default async function InventoryPage(props: PageProps) {
  const params = await props?.params;
  const slug = decodeURIComponent(params?.slug as string);

  if (!slug) notFound();

  const classified = await prisma.classified.findUnique({
    where: { slug },
    include: { make: true, images: true },
  });

  if (!classified) notFound();

  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(slug));
  }

  return <ClassifiedView {...classified} />;
}
