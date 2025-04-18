// Определение интерфейсов для типизации ответов и ошибок
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import type { FetchError } from "ofetch";

export interface ApiError {
  message?: string;
  data?: {
    fields?: Record<string, string>;
    field?: string;
    message?: string;
  };
}

export interface ServerFetchError {
  message: string;
  status: number;
  fields?: Record<string, string>;
}

export interface ServerFetchResult<T> {
  data: T | null;
  error: ServerFetchError | null;
}

export async function serverFetch<T>(
  url: NitroFetchRequest,
  options?: NitroFetchOptions<
    NitroFetchRequest,
    | "delete"
    | "get"
    | "options"
    | "post"
    | "patch"
    | "head"
    | "put"
    | "connect"
    | "trace"
  >,
): Promise<ServerFetchResult<T>> {
  const toast = useToast();

  try {
    const responseData = await $fetch<T>(url, options);

    return {
      data: responseData,
      error: null,
    } as ServerFetchResult<T>;
  } catch (err) {
    console.error("API Error:", err);

    const fetchError = err as FetchError;

    const result: ServerFetchResult<T> = {
      data: null,
      error: {
        message: "Произошла неизвестная ошибка",
        status: fetchError.status || 500,
      },
    };

    if (fetchError.response && fetchError.response._data) {
      const responseData = fetchError.response._data as ApiError;

      const errorMessage =
        responseData.message || "Произошла неизвестная ошибка";

      if (result.error) {
        result.error.message = errorMessage;
      }

      if (responseData.data?.fields && result.error) {
        result.error.fields = responseData.data.fields;
        return result;
      }

      if (
        responseData.data?.field &&
        responseData.data?.message &&
        result.error
      ) {
        result.error.fields = {
          [responseData.data.field]: responseData.data.message,
        };
        return result;
      }

      if (fetchError.response.status === 409) {
        return result;
      }

      if (result.error) {
        switch (fetchError.status) {
          case 404:
            result.error.message =
              responseData.data?.message || "Запрашиваемый ресурс не найден";
            break;
          case 422:
            result.error.message = "Предоставленные данные некорректны";
            break;
          case 401:
            result.error.message = "Требуется авторизация";
            break;
          case 403:
            result.error.message = "Доступ запрещен";
            break;
          case 503:
            result.error.message = "Сервис временно недоступен";
            break;
        }
      }
    } else if (
      fetchError.message &&
      fetchError.message.includes("fetch") &&
      result.error
    ) {
      result.error.message = "Ошибка сети. Проверьте подключение к интернету";
    }

    if (result.error) {
      toast.add({
        title: "Error",
        description: result.error.message,
        color: "error",
        duration: 5000,
      });
    }

    return result;
  }
}
