import { prisma } from "../lib/prisma";

async function main() {
  const userCount = await prisma.user.count();
  console.log(`✅ Connected (${userCount} user(s) in database)`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
