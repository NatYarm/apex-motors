import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { env } from '@/env.mjs';
import { PrismaClient } from '@/generated/prisma/client';

const buildConnectionString = (databaseUrl: string): string => {
  const url = new URL(databaseUrl);

  const isLocalHost =
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.hostname === '::1';

  url.searchParams.set('sslmode', isLocalHost ? 'disable' : 'verify-full');

  return url.toString();
};

const connectionString = buildConnectionString(env.DATABASE_URL);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
