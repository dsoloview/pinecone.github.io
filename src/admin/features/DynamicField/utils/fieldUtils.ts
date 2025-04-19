// ~/admin/features/DynamicField/ui/utils/fieldUtils.ts
import type {
  AnyFieldSchema,
  InputFieldSchema,
  TextareaFieldSchema,
  ArrayFieldSchema,
  ObjectFieldSchema,
} from "~/admin/entities/ContentField/model/types";
import { safeClone } from "~/admin/shared/lib/fieldHelpers";

// Типы для определения конкретного поля
function isInputField(field: AnyFieldSchema): field is InputFieldSchema {
  return field.type === "input";
}

function isTextareaField(field: AnyFieldSchema): field is TextareaFieldSchema {
  return field.type === "textarea";
}

function isObjectField(field: AnyFieldSchema): field is ObjectFieldSchema {
  return field.type === "object";
}

function isArrayField(field: AnyFieldSchema): field is ArrayFieldSchema {
  return field.type === "array";
}

// Recursively reset isModified flag and restore original data
export function resetFieldRecursively(field: AnyFieldSchema): void {
  if (!field) return;

  // Сбрасываем флаг модификации
  field.isModified = false;

  // Для строковых полей восстанавливаем оригинальные данные, если они есть
  if (
    (isInputField(field) || isTextareaField(field)) &&
    field.originalData !== undefined
  ) {
    field.data = field.originalData;
    // Важно: переустанавливаем originalData, чтобы сохранить возможность сброса
    field.originalData = field.data;
  }

  // Для объектов восстанавливаем все вложенные поля
  if (isObjectField(field) && field.fields && field.originalFields) {
    // Явно указываем тип
    const newFields: Record<string, AnyFieldSchema> = {};

    // Копируем все поля из оригинальной структуры
    for (const key in field.originalFields) {
      // Создаем копию оригинального поля
      newFields[key] = safeClone(field.originalFields[key]);

      // Сбрасываем флаг модификации
      newFields[key].isModified = false;

      // Важно: переустанавливаем originalData/originalFields для вложенных полей
      if (isInputField(newFields[key]) || isTextareaField(newFields[key])) {
        newFields[key].originalData = newFields[key].data;
      } else if (isObjectField(newFields[key]) && newFields[key].fields) {
        newFields[key].originalFields = safeClone(newFields[key].fields);
      } else if (
        isArrayField(newFields[key]) &&
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
  // Для массивов восстанавливаем все элементы
  else if (
    isArrayField(field) &&
    Array.isArray(field.data) &&
    field.originalData
  ) {
    // Создаем новый массив из оригинальных данных
    const newData = safeClone(field.originalData);

    // Обрабатываем каждый элемент массива
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      if (!item) continue;

      // Сбрасываем флаг модификации
      item.isModified = false;

      // Восстанавливаем оригинальные данные для элементов массива
      if (isInputField(item) || isTextareaField(item)) {
        item.originalData = item.data;
      } else if (isObjectField(item) && item.fields) {
        item.originalFields = safeClone(item.fields);
      } else if (isArrayField(item) && Array.isArray(item.data)) {
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
