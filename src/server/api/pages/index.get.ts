import { getPageRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async () => {
  const pageRepository = getPageRepository();

  return pageRepository.getAllPages();
});
