// ~/admin/features/DynamicField/ui/utils/fieldUtils.ts
import type { AnyFieldSchema } from "~/admin/entities/ContentField/model/types";
import { safeClone } from "~/admin/shared/lib/fieldHelpers";

// Recursively reset isModified flag and restore original data
export function resetFieldRecursively(field: AnyFieldSchema) {
  if (!field) return;

  // Сбрасываем флаг модификации
  field.isModified = false;

  // Для строковых полей восстанавливаем оригинальные данные, если они есть
  if (
    (field.type === "input" || field.type === "textarea") &&
    field.originalData !== undefined
  ) {
    field.data = field.originalData;
    // Важно: переустанавливаем originalData, чтобы сохранить возможность сброса
    field.originalData = field.data;
  }

  // Для объектов восстанавливаем все вложенные поля
  if (field.type === "object" && field.fields) {
    if (field.originalFields) {
      const newFields = {};

      // Копируем все поля из оригинальной структуры
      for (const key in field.originalFields) {
        // Создаем копию оригинального поля
        newFields[key] = safeClone(field.originalFields[key]);

        // Сбрасываем флаг модификации
        newFields[key].isModified = false;

        // Важно: переустанавливаем originalData/originalFields для вложенных полей
        if (
          newFields[key].type === "input" ||
          newFields[key].type === "textarea"
        ) {
          newFields[key].originalData = newFields[key].data;
        } else if (newFields[key].type === "object" && newFields[key].fields) {
          newFields[key].originalFields = safeClone(newFields[key].fields);
        } else if (
          newFields[key].type === "array" &&
          Array.isArray(newFields[key].data)
        ) {
          newFields[key].originalData = safeClone(newFields[key].data);
        }

        // Рекурсивно обрабатываем вложенные поля
        resetFieldRecursively(newFields[key]);
      }

      // Заменяем текущие поля восстановленными
      field.fields = newFields;
      // Обновляем originalFields
      field.originalFields = safeClone(newFields);
    }
  }
  // Для массивов восстанавливаем все элементы
  else if (field.type === "array" && Array.isArray(field.data)) {
    if (field.originalData && Array.isArray(field.originalData)) {
      // Создаем новый массив из оригинальных данных
      const newData = safeClone(field.originalData);

      // Обрабатываем каждый элемент массива
      for (let i = 0; i < newData.length; i++) {
        const item = newData[i];
        if (typeof item !== "object" || !item) continue;

        // Сбрасываем флаг модификации
        item.isModified = false;

        // Важно: переустанавливаем originalData/originalFields для элементов массива
        if (item.type === "input" || item.type === "textarea") {
          item.originalData = item.data;
        } else if (item.type === "object" && item.fields) {
          item.originalFields = safeClone(item.fields);
        } else if (item.type === "array" && Array.isArray(item.data)) {
          item.originalData = safeClone(item.data);
        }

        // Рекурсивно обрабатываем вложенные структуры
        resetFieldRecursively(item);
      }

      // Заменяем текущие данные восстановленными
      field.data = newData;
      // Обновляем originalData
      field.originalData = safeClone(newData);
    }
  }
}
