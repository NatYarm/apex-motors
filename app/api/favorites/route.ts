import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

import { routes } from '@/config/routes';
import { Favorites } from '@/config/types';
import { redis } from '@/lib/redis-store';
import { setSourceId } from '@/lib/source-id';

const validateSchema = z.object({ id: z.number().int() });

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { data, error } = validateSchema.safeParse(body);

  if (!data) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  if (typeof data.id !== 'number') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  // get the source id form cookies
  const sourceId = await setSourceId();

  // retrieve the existing favorites from redis session
  const storedFavorites = await redis.get<Favorites>(sourceId);
  const favorites: Favorites = storedFavorites || { ids: [] };

  if (favorites.ids.includes(data.id)) {
    // add or remove the ID based on its current presence in the favorites
    //remove th ID if it already exists
    favorites.ids = favorites.ids.filter((favId) => favId !== data.id);
  } else {
    // add the id if it doesn't exitst
    favorites.ids.push(data.id);
  }

  // update the redis store with the new list of ids
  await redis.set(sourceId, favorites);

  revalidatePath(routes.favorites);

  return NextResponse.json({ ids: favorites.ids }, { status: 200 });
};
