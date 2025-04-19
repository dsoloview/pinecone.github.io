import { PrismaClient } from "~/generated/prisma";
import { LanguageSeeder } from "~/server/database/prisma/seeders/languages";
import type { ISeeder } from "~/server/interfaces/database.interface";

const prisma = new PrismaClient();

const seeders: ISeeder[] = [new LanguageSeeder()];
async function main() {
  for (const seeder of seeders) {
    await seeder.run(prisma);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
