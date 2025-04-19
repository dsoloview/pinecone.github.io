import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";
import { SLUG_PARAM_SCHEMA } from "~/shared/schema/params.schema";
import {
  getContentRepository,
  getLanguageRepository,
  getPageRepository,
} from "~/server/factories/repository.factory";
import { GET_CONTENT_SCHEMA } from "~/shared/schema/content.schema";

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const { slug } = v.parse(SLUG_PARAM_SCHEMA, params);
    const { language: code } = v.parse(GET_CONTENT_SCHEMA, getQuery(event));

    const contentRepository = getContentRepository();
    const pageRepository = getPageRepository();
    const languageRepository = getLanguageRepository();

    const language = await languageRepository.findByCode(code);
    const page = await pageRepository.findPageByName(slug);

    if (!language || !page) {
      throw new Error("Page not found");
    }
    return (
      await contentRepository.findByPageIdAndLanguageId(page.id, language.id)
    )?.content;
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
