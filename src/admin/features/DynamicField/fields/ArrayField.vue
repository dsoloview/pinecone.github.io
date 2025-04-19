<script setup lang="ts">
import {
  safeClone,
  createArrayItemTemplate,
} from "~/admin/shared/lib/fieldHelpers";
import type {
  FieldEditorProps,
  AnyFieldSchema,
} from "~/admin/entities/ContentField/model/types";
import { resetFieldRecursively } from "~/admin/features/DynamicField/utils/fieldUtils";
import DynamicField from "~/admin/features/DynamicField/ui/DynamicField.vue";

const props = defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

const update = (val: AnyFieldSchema) => {
  const modifiedVal = {
    ...val,
    isModified: true,
  };
  emit("update:modelValue", modifiedVal);
};

function addItem() {
  if (props.fieldSchema.type !== "array") return;

  const newData = Array.isArray(props.fieldSchema.data)
    ? [...props.fieldSchema.data]
    : [];

  // Add new element
  newData.push(createArrayItemTemplate(newData));

  // Update schema with new data
  update({ ...props.fieldSchema, data: newData });
}

// Remove item from array
function removeItem(idx: number) {
  if (props.fieldSchema.type !== "array") return;

  const newData = [...props.fieldSchema.data];
  newData.splice(idx, 1);

  // Update schema with modified data
  update({ ...props.fieldSchema, data: newData });
}

// Update array item
function updateArrayItem(idx: number, item: AnyFieldSchema) {
  if (props.fieldSchema.type !== "array") return;

  const newData = [...props.fieldSchema.data];
  newData[idx] = item;

  // Проверяем, изменилось ли содержимое элемента
  const originalItem =
    props.fieldSchema.originalData &&
    Array.isArray(props.fieldSchema.originalData) &&
    idx < props.fieldSchema.originalData.length
      ? props.fieldSchema.originalData[idx]
      : null;

  // Проверяем, есть ли какие-либо модификации в элементе или его вложенных полях
  let hasModifications = item.isModified;

  // Для объектов проверяем модификации в полях
  if (item.type === "object" && item.fields) {
    for (const key in item.fields) {
      if (item.fields[key]?.isModified) {
        hasModifications = true;
        break;
      }
    }
  }

  // Для массивов проверяем модификации в элементах
  if (item.type === "array" && Array.isArray(item.data)) {
    for (const element of item.data) {
      if (element?.isModified) {
        hasModifications = true;
        break;
      }
    }
  }

  // Обновляем флаг модификации
  item.isModified = hasModifications;

  // Обновляем массив и устанавливаем флаг модификации для всего массива
  update({
    ...props.fieldSchema,
    data: newData,
    isModified: true,
  });
}

// Check if any array item is modified
function hasModifiedArrayItems(): boolean {
  if (
    props.fieldSchema.type !== "array" ||
    !Array.isArray(props.fieldSchema.data)
  )
    return false;

  for (const item of props.fieldSchema.data) {
    if (typeof item === "object" && item && item.isModified) {
      return true;
    }
  }

  return false;
}

// Reset field to original value (structure)
function resetField() {
  if (props.fieldSchema.type !== "array" || !props.fieldSchema.originalData)
    return;

  const resetData = safeClone(props.fieldSchema.originalData);

  // Инициализируем originalData для всех элементов массива
  if (Array.isArray(resetData)) {
    for (const item of resetData) {
      if (!item) continue;

      // Переустанавливаем originalData/originalFields для элементов
      if (item.type === "input" || item.type === "textarea") {
        item.originalData = item.data;
      } else if (item.type === "object" && item.fields) {
        item.originalFields = safeClone(item.fields);

        // Рекурсивно обрабатываем вложенные поля объекта
        for (const key in item.fields) {
          const tempObj = { [key]: item.fields[key] };
          initObjectOriginalData(tempObj);
          item.fields[key] = tempObj[key];
        }
      } else if (item.type === "array" && Array.isArray(item.data)) {
        item.originalData = safeClone(item.data);

        // Рекурсивно обрабатываем элементы вложенного массива
        for (const childItem of item.data) {
          if (childItem) {
            resetFieldRecursively(childItem);
          }
        }
      }
    }
  }

  emit("update:modelValue", {
    ...props.fieldSchema,
    data: resetData,
    isModified: false,
    originalData: safeClone(resetData), // Обновляем originalData
  });
}

// Вспомогательная функция для инициализации originalData в объектах
function initObjectOriginalData(obj: Record<string, AnyFieldSchema>) {
  for (const key in obj) {
    const field = obj[key];
    if (!field) continue;

    if (field.type === "input" || field.type === "textarea") {
      field.originalData = field.data;
    } else if (field.type === "object" && field.fields) {
      field.originalFields = safeClone(field.fields);

      for (const childKey in field.fields) {
        const tempObj = { [childKey]: field.fields[childKey] };
        initObjectOriginalData(tempObj);
        field.fields[childKey] = tempObj[childKey];
      }
    } else if (field.type === "array" && Array.isArray(field.data)) {
      field.originalData = safeClone(field.data);

      for (const item of field.data) {
        if (item) {
          resetFieldRecursively(item);
        }
      }
    }
  }
}

// Reset all array items
function resetAllArrayItems() {
  if (props.fieldSchema.type !== "array" || !props.fieldSchema.originalData)
    return;

  // Делаем глубокую копию оригинальных данных
  const resetData = safeClone(props.fieldSchema.originalData);

  // Инициализируем originalData для всех элементов
  if (Array.isArray(resetData)) {
    for (const item of resetData) {
      if (!item) continue;

      // Устанавливаем флаг модификации в false
      item.isModified = false;

      // Переустанавливаем originalData/originalFields
      if (item.type === "input" || item.type === "textarea") {
        item.originalData = item.data;
      } else if (item.type === "object" && item.fields) {
        item.originalFields = safeClone(item.fields);

        // Рекурсивно инициализируем вложенные поля
        for (const key in item.fields) {
          const tempObj = { [key]: item.fields[key] };
          initObjectOriginalData(tempObj);
          item.fields[key] = tempObj[key];
        }
      } else if (item.type === "array" && Array.isArray(item.data)) {
        item.originalData = safeClone(item.data);

        // Рекурсивно обрабатываем элементы вложенного массива
        for (const childItem of item.data) {
          if (childItem) {
            resetFieldRecursively(childItem);
          }
        }
      }
    }
  }

  // Обновляем через emit
  emit("update:modelValue", {
    ...props.fieldSchema,
    data: resetData,
    isModified: false,
    originalData: safeClone(resetData), // Обновляем originalData
  });
}

// Reset a specific item in array
function resetArrayItem(idx: number, item: AnyFieldSchema) {
  // Проверяем индекс в оригинальных данных
  if (
    props.fieldSchema.type !== "array" ||
    !props.fieldSchema.originalData ||
    !Array.isArray(props.fieldSchema.originalData) ||
    idx >= props.fieldSchema.originalData.length
  )
    return;

  // Получаем оригинальный элемент из массива
  const originalItem = props.fieldSchema.originalData[idx];
  if (!originalItem) return;

  // Делаем глубокую копию оригинального элемента
  const resetItem = safeClone(originalItem);

  // Сохраняем оригинальные данные
  if (item.originalData !== undefined) {
    resetItem.originalData = item.originalData;
  }
  if (item.originalFields) {
    resetItem.originalFields = item.originalFields;
  }

  // Обязательно сбрасываем флаг модификации
  resetItem.isModified = false;

  // Рекурсивно сбрасываем все вложенные поля
  resetFieldRecursively(resetItem);

  // Обновляем элемент в массиве
  updateArrayItem(idx, resetItem);
}
</script>

<template>
  <div
    class="mb-4 border border-gray-200 rounded-lg p-4"
    :class="{
      'bg-gray-50': !fieldSchema.isModified,
      'bg-amber-50': fieldSchema.isModified,
    }"
  >
    <div class="flex justify-between items-center mb-3">
      <div>
        <div class="font-bold">{{ fieldSchema.label }}</div>
        <div class="flex items-center">
          <div v-if="fieldKey" class="text-xs text-gray-500">
            Key: <code class="bg-gray-100 px-1 rounded">{{ fieldKey }}</code>
          </div>
        </div>
        <div class="text-sm text-gray-600">
          Items: {{ fieldSchema.data ? fieldSchema.data.length : 0 }}
        </div>
      </div>
      <div class="flex space-x-2">
        <!-- Reset all array items button -->
        <UTooltip text="Reset all items to original values">
          <UButton
            v-if="fieldSchema.isModified || hasModifiedArrayItems()"
            size="sm"
            color="neutral"
            variant="soft"
            @click="resetAllArrayItems"
          >
            <UIcon name="i-lucide-undo" class="mr-1" />
            Reset All
          </UButton>
        </UTooltip>

        <UButton size="sm" color="primary" variant="soft" @click="addItem">
          <UIcon name="uil:plus" class="mr-1" />
          Add Item
        </UButton>
      </div>
    </div>

    <!-- Array modification indicator -->
    <div
      v-if="fieldSchema.isModified"
      class="bg-amber-100 p-2 rounded mb-3 text-xs text-amber-600 font-medium flex items-center"
    >
      <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
      Array structure has been modified
      <UTooltip text="Reset array structure to original">
        <UButton
          v-if="fieldSchema.originalData !== undefined"
          size="xs"
          color="neutral"
          variant="ghost"
          class="ml-2"
          @click="resetField"
        >
          <UIcon name="i-lucide-undo" class="h-3 w-3 mr-1" />
          Reset Structure
        </UButton>
      </UTooltip>
    </div>

    <!-- Empty state -->
    <div
      v-if="!fieldSchema.data || fieldSchema.data.length === 0"
      class="text-center py-6 text-gray-500"
    >
      Array is empty. Add items using the button above.
    </div>

    <!-- Array blocks using DynamicField -->
    <div v-else class="space-y-3">
      <div
        v-for="(item, idx) in fieldSchema.data"
        :key="idx"
        class="border border-gray-200 p-4 rounded-md bg-white relative"
        :class="{ 'border-amber-300': item.isModified }"
      >
        <!-- Block header with delete button -->
        <div
          class="flex justify-between items-center mb-3 pb-2 border-b border-gray-100"
        >
          <div class="flex items-center">
            <span
              class="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs"
            >
              {{ idx + 1 }}
            </span>
            <h4 class="font-medium">{{ item.label || `Block ${idx + 1}` }}</h4>

            <span
              v-if="item.isModified"
              class="ml-2 text-xs text-amber-600 font-medium flex items-center"
            >
              <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
              Modified
              <UTooltip
                v-if="
                  fieldSchema.originalData &&
                  idx < fieldSchema.originalData.length
                "
                text="Reset item to original state"
              >
                <UButton
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  class="ml-1"
                  @click="resetArrayItem(idx, item)"
                >
                  <UIcon name="i-lucide-undo" class="h-3 w-3 mr-1" />
                  Reset
                </UButton>
              </UTooltip>
            </span>
          </div>
          <UButton
            size="xs"
            color="error"
            variant="soft"
            icon="i-uil:times"
            @click="removeItem(idx)"
          />
        </div>

        <!-- Use DynamicField to display array item -->
        <DynamicField
          :field-schema="item"
          :model-value="item"
          @update:model-value="(val) => updateArrayItem(idx, val)"
        />
      </div>
    </div>
  </div>
</template>
