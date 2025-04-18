import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import type { FetchError } from "ofetch";

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface ApiError {
  status: number;
  message: string;
  data?: {
    fields?: Record<string, string>;
    field?: string;
    message?: string;
  };
}

export interface ValidationError {
  fields: Record<string, string>;
}

export interface ServerFetchResult<T> {
  data: T | null;
  error: {
    fields?: Record<string, string>;
    message?: string;
    status?: number;
  } | null;
}

export async function serverFetch<T = any>(
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
    const data = await $fetch<T>(url, options);

    return {
      data,
      error: null,
    };
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
      const { message, data } = fetchError.response._data as ApiError;

      result.error!.message = message || result.error?.message;

      if (data?.fields) {
        result.error!.fields = data.fields;

        return result;
      }

      if (data?.field && data?.message) {
        result.error!.fields = { [data.field]: data.message };

        return result;
      }

      if (fetchError.response.status === 409) {
        return result;
      }

      switch (fetchError.status) {
        case 404:
          result.error!.message =
            data?.message || "Запрашиваемый ресурс не найден";
          break;
        case 422:
          result.error!.message = "Предоставленные данные некорректны";
          break;
        case 401:
          result.error!.message = "Требуется авторизация";
          break;
        case 403:
          result.error!.message = "Доступ запрещен";
          break;
        case 503:
          result.error!.message = "Сервис временно недоступен";
          break;
      }
    } else if (fetchError.message && fetchError.message.includes("fetch")) {
      result.error!.message = "Ошибка сети. Проверьте подключение к интернету";
    }

    toast.add({
      title: "Error",
      description: result.error!.message,
      color: "error",
      duration: 5000,
    });

    return result;
  }
}
