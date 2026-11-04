'use server';

import { randomInt } from 'node:crypto';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';
import { createPngDataUri } from 'unlazy/thumbhash';

import { StreamableSkeletonProps } from '@/components/admin/classifieds/StreamableSkeleton';
import { routes } from '@/config/routes';
import { CurrencyCode } from '@/generated/prisma/enums';
import { getSession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server';

export const createClassifiedAction = async (data: StreamableSkeletonProps) => {
  const session = await getSession();

  if (!session) return { success: false, error: 'Unauthorized' };

  let success = false;
  let classifiedId: number | null = null;

  try {
    const make = await prisma.make.findUnique({
      where: { id: data.makeId as number },
    });
    const model = await prisma.model.findUnique({
      where: { id: data.modelId as number },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (data?.modelVariant) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: data.modelVariantId as number },
      });

      if (modelVariant) title = `${title} ${modelVariant.name}`;
    }

    let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`);

    const slugLikeFound = await prisma.classified.count({
      where: { slug: { contains: slug, mode: 'insensitive' } },
    });

    if (slugLikeFound) {
      slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`);
    }

    const thumbhash = await generateThumbHashFromSrcUrl(data.image as string);
    const uri = createPngDataUri(thumbhash);

    const classified = await prisma.classified.create({
      data: {
        slug,
        title,
        year: Number(data.year),
        makeId: data.makeId as number,
        modelId: data.modelId as number,
        ...(data.modelVariantId && {
          modelVariantId: data.modelVariantId as number,
        }),
        vrm: data?.vrm ? data.vrm : null,
        price: 0,
        currency: CurrencyCode.EUR,
        odoReading: data.odoReading,
        odoUnit: data.odoUnit,
        fuelType: data.fuelType,
        bodyType: data.bodyType,
        color: data.color,
        transmission: data.transmission,
        description: data.description,
        doors: data.doors,
        seats: data.seats,
        images: {
          create: {
            isMain: true,
            blurhash: uri,
            src: data.image as string,
            alt: title,
          },
        },
      },
    });

    if (classified) {
      classifiedId = classified.id;
      success = true;
    }
  } catch {
    return { success: false, message: 'Something went wrong' };
  }

  if (success && classifiedId) {
    revalidatePath(routes.admin.classifieds);
    redirect(routes.admin.editClassified(classifiedId));
  } else {
    return { success: false, message: 'Failed to create classified' };
  }
};
