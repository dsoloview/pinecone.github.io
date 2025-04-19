// src/admin/entities/PageContent/api/pageContentApi.ts
import type { AnyFieldSchema } from "~/admin/entities/ContentField/model/types";

export interface SavePageContentRequest {
  slug: string;
  language: string;
  content: Record<string, AnyFieldSchema>;
}

export async function savePageContent(
  data: SavePageContentRequest,
): Promise<boolean> {
  try {
    // Здесь будет реальный вызов API
    console.log("Вызов API для сохранения контента страницы:", data);

    // Временная имитация запроса
    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error("Ошибка при сохранении контента:", error);
    return false;
  }
}

export async function fetchPageContent(
  slug: string,
  language: string,
): Promise<Record<string, AnyFieldSchema> | null> {
  try {
    const { data } = await useAsyncData<Record<string, AnyFieldSchema>>(
      `page-${slug}-${language}`,
      () => {
        return $fetch(`/api/content/${slug}`, {
          method: "GET",
          query: {
            language: language,
          },
        });
      },
    );

    return data.value;
  } catch (error) {
    console.error("Ошибка при загрузке контента:", error);
    return {};
  }
}
