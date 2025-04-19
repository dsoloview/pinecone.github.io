import prisma from "~/server/database/lib/prisma";
import type { Content } from "~/generated/prisma";

export class ContentRepository {
  async findByPageIdAndLanguageId(
    pageId: number,
    languageId: number,
  ): Promise<Content | null> {
    return prisma.content.findFirst({
      where: {
        page_id: pageId,
        language_id: languageId,
      },
    });
  }
}
