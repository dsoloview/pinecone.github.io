import type { H3Error } from "h3";
import { ValiError } from "valibot";
import { Prisma } from "~/generated/prisma";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

export function handleServerError(err: Error | unknown) {
  const h3Error = err as H3Error;
  if (h3Error.statusCode && h3Error.statusMessage) {
    throw h3Error;
  }

  if (err instanceof ValiError) {
    const issues = err.issues;
    const fields: Record<string, string> = {};

    issues.forEach((issue) => {
      const path = issue.path?.[0]?.key;
      if (path) {
        fields[path.toString()] = issue.message;
      }
    });

    throw createError({
      status: 422,
      message: "Validation error",
      data: { fields },
    });
  }

  // Обработка ошибок Prisma
  if (err instanceof Error && "code" in (err as any)) {
    const prismaError = err as PrismaClientKnownRequestError & {
      code: string;
      meta?: any;
    };

    switch (prismaError.code) {
      // Нарушение уникального ограничения (например, дублирование email)
      case "P2002": {
        const target = prismaError.meta?.target as string[];
        const field = target?.[0] || "field";

        throw createError({
          status: 409, // Conflict
          message: "Constraint violation",
          data: {
            fields: { [field]: `Этот ${field} уже используется` },
          },
        });
      }

      // Запись не найдена
      case "P2001":
      case "P2025":
        throw createError({
          status: 404,
          message: "Record not found",
          data: { message: "Запрашиваемая запись не существует" },
        });

      // Нарушение внешнего ключа
      case "P2003": {
        const field = prismaError.meta?.field_name || "field";
        throw createError({
          status: 400,
          message: "Foreign key constraint failed",
          data: {
            fields: { [field]: `Связанная запись не существует` },
          },
        });
      }

      // Ошибка валидации Prisma
      case "P2007":
        throw createError({
          status: 400,
          message: "Prisma validation error",
          data: { message: prismaError.message },
        });
    }
  }

  // Проверка для других ошибок Prisma, которые могут не иметь кода
  if (err instanceof Error && err.name === "PrismaClientValidationError") {
    throw createError({
      status: 400,
      message: "Invalid data format",
      data: { message: "Предоставленные данные не соответствуют модели" },
    });
  }

  // Проверка для ошибок соединения с базой данных
  if (err instanceof Error && err.message.includes("connect")) {
    throw createError({
      status: 503,
      message: "Database connection error",
      data: { message: "Не удалось подключиться к базе данных" },
    });
  }

  throw createError({
    status: 500,
    message: "Внутренняя ошибка сервера",
    data: err,
  });
}
