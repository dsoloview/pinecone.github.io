// src/admin/shared/lib/fieldHelpers.ts

import type {
  AnyFieldSchema,
  FieldType,
  StringFieldSchema,
  ObjectFieldSchema,
  ArrayFieldSchema,
} from "~/admin/entities/ContentField/model/types";

/**
 * Создает глубокую копию объекта
 */
export function safeClone<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Создает новое поле заданного типа
 */
export function createField(key: string, type: FieldType): AnyFieldSchema {
  const label =
    key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

  switch (type) {
    case "input":
      return {
        type: "input",
        label,
        placeholder: `Введите ${key}`,
        data: "",
        isModified: true,
      };
    case "textarea":
      return {
        type: "textarea",
        label,
        placeholder: `Введите ${key}`,
        data: "",
        isModified: true,
      };
    case "object":
      return {
        type: "object",
        label,
        fields: {},
        isModified: true,
      };
    case "array":
      return {
        type: "array",
        label,
        data: [],
        isModified: true,
      };
    case "seo":
      return {
        type: "seo",
        label: "SEO настройки",
        data: {
          title: "",
          description: "",
          keywords: "",
          openGraph: {
            title: "",
            description: "",
          },
        },
        isModified: true,
      };
    default:
      return {
        type: "input",
        label,
        placeholder: `Введите ${key}`,
        data: "",
        isModified: true,
      };
  }
}

/**
 * Создает шаблон элемента массива
 */
export function createArrayItemTemplate(
  existingItems: AnyFieldSchema[],
): AnyFieldSchema {
  // Определяем тип первого элемента, если массив не пуст
  if (existingItems.length > 0) {
    const firstItem = existingItems[0];

    // Создаем элемент того же типа
    return {
      type: firstItem.type,
      label: `Блок ${existingItems.length + 1}`,
      ...(firstItem.type === "input" || firstItem.type === "textarea"
        ? { data: "", placeholder: firstItem.placeholder }
        : firstItem.type === "object"
          ? { fields: {} }
          : { data: [] }),
      isModified: true,
    };
  }

  // Если массив пуст, создаем объект по умолчанию
  return {
    type: "object",
    label: "Новый блок",
    fields: {},
    isModified: true,
  };
}

/**
 * Сравнивает два значения и возвращает true, если они равны
 */
export function isEqual(value1: any, value2: any): boolean {
  // Проверка на идентичность ссылок
  if (value1 === value2) return true;

  // Проверка на null или undefined
  if (
    value1 === null ||
    value1 === undefined ||
    value2 === null ||
    value2 === undefined
  ) {
    return value1 === value2;
  }

  // Проверка типа
  if (typeof value1 !== typeof value2) return false;

  // Если это не объекты, сравниваем значения напрямую
  if (typeof value1 !== "object") return value1 === value2;

  // Проверка на массивы
  const isArray1 = Array.isArray(value1);
  const isArray2 = Array.isArray(value2);

  if (isArray1 !== isArray2) return false;

  if (isArray1 && isArray2) {
    // Сравнение массивов
    if (value1.length !== value2.length) return false;

    for (let i = 0; i < value1.length; i++) {
      if (!isEqual(value1[i], value2[i])) return false;
    }

    return true;
  }

  // Сравнение объектов
  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(value1[key], value2[key])) return false;
  }

  return true;
}

/**
 * Помечает поля, которые были изменены относительно оригинальных значений
 */
export function markModifiedFields(current: any, original: any): any {
  if (!current || !original) return current;

  if (typeof current !== "object" || current === null) {
    return current;
  }

  const result = { ...current };

  if (current.type === "input" || current.type === "textarea") {
    // Для простых полей сравниваем данные
    result.isModified = !isEqual(current.data, original.data);
    // Сохраняем оригинальные данные, если их нет
    if (result.originalData === undefined) {
      result.originalData = original.data;
    }
    return result;
  } else if (current.type === "object" && current.fields) {
    // Для объектов проверяем каждое поле
    result.isModified = false;
    result.fields = { ...current.fields };

    // Сохраняем оригинальную структуру полей, если ее нет
    if (result.originalFields === undefined) {
      result.originalFields = safeClone(original.fields || {});
    }

    // Проверяем каждое поле объекта
    for (const key in result.fields) {
      if (original.fields && key in original.fields) {
        // Рекурсивно помечаем вложенные поля
        result.fields[key] = markModifiedFields(
          result.fields[key],
          original.fields[key],
        );

        // Если хотя бы одно поле изменено, помечаем объект как измененный
        if (result.fields[key].isModified) {
          result.isModified = true;
        }
      } else {
        // Новые поля всегда помечаем как измененные
        result.fields[key].isModified = true;
        result.isModified = true;
      }
    }

    // Проверяем удаленные поля
    for (const key in original.fields) {
      if (!(key in result.fields)) {
        result.isModified = true;
        break;
      }
    }

    return result;
  } else if (current.type === "array" && current.data) {
    // Для массива проверяем все элементы
    result.isModified = current.data.length !== original.data?.length;
    result.data = [...current.data];

    // Если элементы массива отличаются по количеству, весь массив изменен
    if (!result.isModified && current.data.length > 0) {
      // Проверяем каждый элемент массива
      for (let i = 0; i < current.data.length; i++) {
        if (i < original.data.length) {
          result.data[i] = markModifiedFields(
            current.data[i],
            original.data[i],
          );
          if (result.data[i].isModified) {
            result.isModified = true;
          }
        } else {
          // Новые элементы массива помечаем как измененные
          result.data[i] = { ...current.data[i], isModified: true };
          result.isModified = true;
        }
      }
    }

    // Сохраняем оригинальные данные, если их нет
    if (result.originalData === undefined) {
      result.originalData = safeClone(original.data || []);
    }

    return result;
  } else if (current.type === "seo") {
    // Для SEO поля проверяем все вложенные поля
    result.isModified = !isEqual(current.data, original.data);

    // Сохраняем оригинальные данные, если их нет
    if (result.originalData === undefined) {
      result.originalData = safeClone(original.data || {});
    }

    return result;
  }

  return result;
}

/**
 * Сбрасывает поле к оригинальному значению
 */
export function resetField(field: AnyFieldSchema): AnyFieldSchema {
  if (!field) return field;

  if (field.type === "input" || field.type === "textarea") {
    // Для строковых полей восстанавливаем оригинальные данные
    if (field.originalData !== undefined) {
      return {
        ...field,
        data: field.originalData,
        isModified: false,
      };
    }
  } else if (field.type === "object" && field.fields) {
    // Для объектов восстанавливаем оригинальную структуру
    if (field.originalFields) {
      // Восстанавливаем только существующие поля
      const resetFields: Record<string, AnyFieldSchema> = {};

      for (const key in field.fields) {
        if (key in field.originalFields) {
          // Если поле существовало в оригинале, сбрасываем его
          resetFields[key] = resetField(field.fields[key]);
        } else {
          // Если это новое поле, удаляем его при сбросе
          // Ничего не делаем, не добавляем в resetFields
        }
      }

      // Восстанавливаем удаленные поля
      for (const key in field.originalFields) {
        if (!(key in field.fields)) {
          resetFields[key] = safeClone(field.originalFields[key]);
        }
      }

      return {
        ...field,
        fields: resetFields,
        isModified: false,
      };
    }
  } else if (field.type === "array" && field.data) {
    // Для массивов восстанавливаем оригинальные элементы
    if (field.originalData) {
      return {
        ...field,
        data: safeClone(field.originalData),
        isModified: false,
      };
    }
  } else if (field.type === "seo") {
    // Для SEO поля восстанавливаем все оригинальные значения
    if (field.originalData) {
      return {
        ...field,
        data: safeClone(field.originalData),
        isModified: false,
      };
    }
  }

  return { ...field, isModified: false };
}

/**
 * Сбрасывает все изменения в контенте
 */
export function resetAllContent(
  content: Record<string, AnyFieldSchema>,
  originalContent: Record<string, AnyFieldSchema>,
): Record<string, AnyFieldSchema> {
  const resetContent: Record<string, AnyFieldSchema> = {};

  // Восстанавливаем существующие поля
  for (const key in content) {
    if (key in originalContent) {
      resetContent[key] = resetField(content[key]);
    }
  }

  // Восстанавливаем удаленные поля
  for (const key in originalContent) {
    if (!(key in content)) {
      resetContent[key] = safeClone(originalContent[key]);
    }
  }

  return resetContent;
}
