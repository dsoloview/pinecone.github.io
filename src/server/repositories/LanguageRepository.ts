import prisma from "~/server/database/lib/prisma";
import type { Language } from "~/generated/prisma";

export class LanguageRepository {
  async findByCode(code: string): Promise<Language | null> {
    return prisma.language.findFirst({
      where: {
        code: code,
      },
    });
  }
}
