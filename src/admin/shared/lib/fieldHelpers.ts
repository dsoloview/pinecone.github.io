// src/admin/shared/lib/fieldHelpers.ts

import type {
  AnyFieldSchema,
  FieldType,
  InputFieldSchema,
  TextareaFieldSchema,
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
export function createField(
  key: string,
  label: string,
  type: FieldType,
): AnyFieldSchema {
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
    } as AnyFieldSchema;
  }

  // Если массив пуст, создаем объект по умолчанию
  return {
    type: "object",
    label: "Новый блок",
    fields: {},
    isModified: true,
  };
}

// Типизированная вспомогательная функция для проверки типов полей
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

/**
 * Сравнивает два значения и возвращает true, если они равны
 */
export function isEqual<T>(value1: T, value2: T): boolean {
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
    const arr1 = value1 as unknown as Array<unknown>;
    const arr2 = value2 as unknown as Array<unknown>;

    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (!isEqual(arr1[i], arr2[i])) return false;
    }

    return true;
  }

  // Сравнение объектов
  const obj1 = value1 as Record<string, unknown>;
  const obj2 = value2 as Record<string, unknown>;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Помечает поля, которые были изменены относительно оригинальных значений
 */
export function markModifiedFields(
  current: AnyFieldSchema,
  original: AnyFieldSchema,
): AnyFieldSchema {
  if (!current || !original) return current;

  if (typeof current !== "object" || current === null) {
    return current;
  }

  const result = { ...current };

  if (isInputField(current) && isInputField(original)) {
    // Для простых полей сравниваем данные
    result.isModified = !isEqual(current.data, original.data);
    // Сохраняем оригинальные данные, если их нет
    if (result.originalData === undefined) {
      result.originalData = original.data;
    }
    return result as AnyFieldSchema;
  } else if (isTextareaField(current) && isTextareaField(original)) {
    // Для текстовых полей сравниваем данные
    result.isModified = !isEqual(current.data, original.data);
    // Сохраняем оригинальные данные, если их нет
    if (result.originalData === undefined) {
      result.originalData = original.data;
    }
    return result as AnyFieldSchema;
  } else if (
    isObjectField(current) &&
    isObjectField(original) &&
    current.fields
  ) {
    // Для объектов проверяем каждое поле
    const objectResult = result as ObjectFieldSchema;
    objectResult.isModified = false;
    objectResult.fields = { ...current.fields };

    // Сохраняем оригинальную структуру полей, если ее нет
    if (objectResult.originalFields === undefined) {
      objectResult.originalFields = safeClone(original.fields || {});
    }

    // Проверяем каждое поле объекта
    for (const key in objectResult.fields) {
      if (original.fields && key in original.fields) {
        // Рекурсивно помечаем вложенные поля
        objectResult.fields[key] = markModifiedFields(
          objectResult.fields[key],
          original.fields[key],
        );

        // Если хотя бы одно поле изменено, помечаем объект как измененный
        if (objectResult.fields[key].isModified) {
          objectResult.isModified = true;
        }
      } else {
        // Новые поля всегда помечаем как измененные
        objectResult.fields[key].isModified = true;
        objectResult.isModified = true;
      }
    }

    // Проверяем удаленные поля
    for (const key in original.fields) {
      if (!(key in objectResult.fields)) {
        objectResult.isModified = true;
        break;
      }
    }

    return objectResult;
  } else if (
    isArrayField(current) &&
    isArrayField(original) &&
    Array.isArray(current.data)
  ) {
    // Для массива проверяем все элементы
    const arrayResult = result as ArrayFieldSchema;
    arrayResult.isModified =
      current.data.length !== (original.data?.length || 0);
    arrayResult.data = [...current.data];

    // Если элементы массива отличаются по количеству, весь массив изменен
    if (!arrayResult.isModified && current.data.length > 0 && original.data) {
      // Проверяем каждый элемент массива
      for (let i = 0; i < current.data.length; i++) {
        if (i < original.data.length) {
          arrayResult.data[i] = markModifiedFields(
            current.data[i],
            original.data[i],
          );
          if (arrayResult.data[i].isModified) {
            arrayResult.isModified = true;
          }
        } else {
          // Новые элементы массива помечаем как измененные
          arrayResult.data[i] = { ...current.data[i], isModified: true };
          arrayResult.isModified = true;
        }
      }
    }

    // Сохраняем оригинальные данные, если их нет
    if (arrayResult.originalData === undefined) {
      arrayResult.originalData = safeClone(original.data || []);
    }

    return arrayResult;
  }

  return result as AnyFieldSchema;
}

/**
 * Сбрасывает поле к оригинальному значению
 */
export function resetField(field: AnyFieldSchema): AnyFieldSchema {
  if (!field) return field;

  if (isInputField(field) || isTextareaField(field)) {
    // Для строковых полей восстанавливаем оригинальные данные
    if (field.originalData !== undefined) {
      return {
        ...field,
        data: field.originalData,
        isModified: false,
      };
    }
  } else if (isObjectField(field) && field.fields) {
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
  } else if (isArrayField(field) && field.data) {
    // Для массивов восстанавливаем оригинальные элементы
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
