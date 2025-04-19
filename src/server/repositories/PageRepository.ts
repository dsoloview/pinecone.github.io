import prisma from "~/server/database/lib/prisma";
import type { Page } from "~/generated/prisma";

export class PageRepository {
  async findPageByName(name: string): Promise<Page | null> {
    return prisma.page.findUnique({
      where: {
        name: name,
      },
    });
  }

  async getAllPages(): Promise<Page[]> {
    return prisma.page.findMany();
  }

  async createUser(page: Omit<Page, "id">) {
    return prisma.page.create({
      data: page,
    });
  }

  async deletePage(id: number) {
    return prisma.page.delete({
      where: {
        id: id,
      },
    });
  }

  async updatePage(id: number, page: Partial<Page>) {
    return prisma.page.update({
      where: {
        id: id,
      },
      data: page,
    });
  }
}
