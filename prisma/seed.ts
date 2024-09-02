// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@admin.com',
      password: '$2b$10$lNKnJxBspPfKNBtf7LCnl.raIVE13bKoCkgBe5IyH8C9M0tDvHhOC',
    },
  });

  console.log({ post1 });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
