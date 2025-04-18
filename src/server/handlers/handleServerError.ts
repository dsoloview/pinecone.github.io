import type { H3Error } from "h3";
import { ValiError } from "valibot";
import type { PrismaClientKnownRequestError } from "~/generated/prisma/runtime/library";

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

  if (err instanceof Error && "code" in (err as object)) {
    const prismaError = err as PrismaClientKnownRequestError & {
      code: string;
      meta?: object;
    };

    switch (prismaError.code) {
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

      case "P2001":
      case "P2025":
        throw createError({
          status: 404,
          message: "Record not found",
          data: { message: "Запрашиваемая запись не существует" },
        });

      case "P2003": {
        const field = (prismaError.meta?.field_name as string) || "field";
        throw createError({
          status: 400,
          message: "Foreign key constraint failed",
          data: {
            fields: { [field]: `Связанная запись не существует` },
          },
        });
      }

      case "P2007":
        throw createError({
          status: 400,
          message: "Prisma validation error",
          data: { message: prismaError.message },
        });
    }
  }

  if (err instanceof Error && err.name === "PrismaClientValidationError") {
    throw createError({
      status: 400,
      message: "Invalid data format",
      data: { message: "Предоставленные данные не соответствуют модели" },
    });
  }

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
