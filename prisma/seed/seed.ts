//import { seedClassifieds } from './classifieds.seed';
import { seedImages } from './images.seed';
//import { seedTaxonomy } from './taxonomy.seed';

import { prisma } from '@/lib/prisma';

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await seedTaxonomy(prisma);
  //await seedClassifieds(prisma);

  await seedImages(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
