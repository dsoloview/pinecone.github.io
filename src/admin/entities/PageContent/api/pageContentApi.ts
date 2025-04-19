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
): Promise<Record<string, AnyFieldSchema> | null> {
  try {
    // Здесь будет реальный вызов API
    console.log("Загрузка контента страницы:", { slug });

    // Временная имитация запроса
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Временные тестовые данные
    return {
      title: {
        type: "input",
        label: "Заголовок страницы",
        placeholder: "Введите заголовок",
        data: "text",
      },
      subTitle: {
        type: "object",
        label: "Подзаголовок",
        fields: {
          main: {
            type: "input",
            label: "Основной текст",
            placeholder: "Введите основной текст",
            data: "text",
          },
          bold: {
            type: "input",
            label: "Выделенный текст",
            placeholder: "Введите выделенный текст",
            data: "text",
          },
        },
      },
      textBlocks: {
        type: "array",
        label: "Текстовые блоки",
        data: [
          {
            type: "object",
            label: "Блок",
            fields: {
              title: {
                type: "input",
                label: "Заголовок",
                placeholder: "Заголовок",
                data: "Title",
              },
              paragraphs: {
                type: "array",
                label: "Параграфы",
                placeholder: "Параграфы",
                data: [
                  {
                    type: "input",
                    label: "Block",
                    placeholder: "Block",
                    data: "Block 1",
                  },
                  {
                    type: "input",
                    label: "Block",
                    placeholder: "Block",
                    data: "Block 2",
                  },
                ],
              },
            },
          },
        ],
      },
      seo: {
        type: "object",
        label: "SEO настройки",
        fields: {
          title: {
            type: "input",
            label: "Meta Title",
            placeholder: "Введите мета-заголовок",
            data: "text",
          },
          description: {
            type: "textarea",
            label: "Meta Description",
            placeholder: "Введите мета-описание",
            data: "text",
          },
          keywords: {
            type: "textarea",
            label: "Keywords",
            placeholder: "Введите ключевые слова",
            data: "text",
          },
          openGraph: {
            type: "object",
            label: "Open Graph",
            fields: {
              title: {
                type: "input",
                label: "OG Title",
                placeholder: "Введите OG заголовок",
                data: "",
              },
              description: {
                type: "textarea",
                label: "OG Description",
                placeholder: "Введите OG описание",
                data: "",
              },
            },
          },
        },
      },
    };
  } catch (error) {
    console.error("Ошибка при загрузке контента:", error);
    return null;
  }
}
