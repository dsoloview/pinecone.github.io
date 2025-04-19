import type { Language, PrismaClient } from "~/generated/prisma";
import type { ISeeder } from "~/server/interfaces/database.interface";

const languages: Omit<Language, "id">[] = [
  {
    name: "English",
    code: "EN",
  },
  {
    name: "Srpski",
    code: "RS",
  },
];

export class LanguageSeeder implements ISeeder {
  async run(prisma: PrismaClient) {
    for (const language of languages) {
      await prisma.language.upsert({
        where: {
          name: language.name,
        },
        update: {},
        create: language,
      });
    }
  }
}
