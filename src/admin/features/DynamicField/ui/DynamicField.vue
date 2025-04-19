<script setup lang="ts">
import { ref } from "vue";
import AddFieldForm from "~/admin/features/AddFieldForm/ui/AddFieldForm.vue";
import {
  createField,
  createArrayItemTemplate,
  safeClone,
} from "~/admin/shared/lib/fieldHelpers";
import type {
  AnyFieldSchema,
  FieldEditorProps,
  FieldType,
} from "~/admin/entities/ContentField/model/types";

const props = defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

const update = (val: AnyFieldSchema) => {
  // Set modification flag on update
  const modifiedVal = {
    ...val,
    isModified: true,
  };
  emit("update:modelValue", modifiedVal);
};

// State for adding new fields forms
const showAddFormObj = ref(false);

// Add item to array
function addItem() {
  if (props.fieldSchema.type !== "array") return;

  // Create a copy of data from schema
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

  // Update schema with modified data
  update({ ...props.fieldSchema, data: newData });
}

// Add new field to object
function addObjectField(key: string, type: FieldType) {
  if (props.fieldSchema.type !== "object") return;

  // Create a copy of fields (or initialize empty object if no fields yet)
  const updatedFields = props.fieldSchema.fields
    ? { ...props.fieldSchema.fields }
    : {};

  // Create and add new field
  updatedFields[key] = createField(key, type);

  // Update schema with new fields
  const updatedSchema = {
    ...props.fieldSchema,
    fields: updatedFields,
  };

  update(updatedSchema);
  showAddFormObj.value = false;
}

// Remove field from object
function removeObjectField(key: string) {
  if (props.fieldSchema.type !== "object" || !props.fieldSchema.fields) return;

  const updatedFields = { ...props.fieldSchema.fields };
  delete updatedFields[key];

  update({
    ...props.fieldSchema,
    fields: updatedFields,
  });
}

// Get existing keys for validation
function getExistingKeys(): string[] {
  if (props.fieldSchema.type === "object" && props.fieldSchema.fields) {
    return Object.keys(props.fieldSchema.fields);
  }
  return [];
}

// Reset field to original value
function resetField() {
  if (!props.fieldSchema.originalData && !props.fieldSchema.originalFields)
    return;

  if (
    props.fieldSchema.type === "input" ||
    props.fieldSchema.type === "textarea"
  ) {
    if (props.fieldSchema.originalData !== undefined) {
      emit("update:modelValue", {
        ...props.fieldSchema,
        data: props.fieldSchema.originalData,
        isModified: false,
      });
    }
  } else if (props.fieldSchema.type === "array") {
    if (props.fieldSchema.originalData !== undefined) {
      const resetData = safeClone(props.fieldSchema.originalData);

      // Сбрасываем флаг модификации у всех элементов
      if (Array.isArray(resetData)) {
        for (const item of resetData) {
          if (typeof item === "object" && item) {
            resetFieldRecursively(item);
          }
        }
      }

      emit("update:modelValue", {
        ...props.fieldSchema,
        data: resetData,
        isModified: false,
      });
    }
  } else if (props.fieldSchema.type === "object") {
    if (props.fieldSchema.originalFields !== undefined) {
      const resetFields = safeClone(props.fieldSchema.originalFields);
      // Reset isModified flags for all nested fields
      for (const key in resetFields) {
        if (resetFields[key]) {
          resetFieldRecursively(resetFields[key]);
        }
      }
      emit("update:modelValue", {
        ...props.fieldSchema,
        fields: resetFields,
        isModified: false,
      });
    }
  }
}

// Reset specific object field to original value
function resetObjectField(key: string) {
  if (
    props.fieldSchema.type !== "object" ||
    !props.fieldSchema.fields ||
    !props.fieldSchema.originalFields ||
    !props.fieldSchema.originalFields[key]
  )
    return;

  const updatedFields = { ...props.fieldSchema.fields };

  // Replace the field with its original version and reset modification flag
  updatedFields[key] = safeClone(props.fieldSchema.originalFields[key]);
  updatedFields[key].isModified = false;

  if (updatedFields[key].type === "object" && updatedFields[key].fields) {
    // Reset all nested fields recursively
    for (const nestedKey in updatedFields[key].fields) {
      resetFieldRecursively(updatedFields[key].fields[nestedKey]);
    }
  } else if (
    updatedFields[key].type === "array" &&
    Array.isArray(updatedFields[key].data)
  ) {
    // Reset all array items recursively
    updatedFields[key].data.forEach((item) => {
      if (typeof item === "object" && item) {
        resetFieldRecursively(item);
      }
    });
  }

  update({
    ...props.fieldSchema,
    fields: updatedFields,
  });
}

// Check if any object field is modified
function hasModifiedChildFields(): boolean {
  if (props.fieldSchema.type !== "object" || !props.fieldSchema.fields)
    return false;

  for (const key in props.fieldSchema.fields) {
    if (props.fieldSchema.fields[key].isModified) {
      return true;
    }
  }

  return false;
}

// Reset all child fields in object
function resetAllChildFields() {
  if (props.fieldSchema.type !== "object" || !props.fieldSchema.fields) return;

  if (!props.fieldSchema.originalFields) return;

  const resetFields = safeClone(props.fieldSchema.originalFields);

  // Reset isModified flag for all fields recursively
  for (const key in resetFields) {
    if (resetFields[key]) {
      resetFieldRecursively(resetFields[key]);
    }
  }

  emit("update:modelValue", {
    ...props.fieldSchema,
    fields: resetFields,
    isModified: false,
  });
}

// Recursively reset isModified flag and restore original data
function resetFieldRecursively(field: AnyFieldSchema) {
  if (!field) return;

  // Сбрасываем флаг модификации
  field.isModified = false;

  // Для строковых полей восстанавливаем оригинальные данные, если они есть
  if (
    (field.type === "input" || field.type === "textarea") &&
    field.originalData !== undefined
  ) {
    field.data = field.originalData;
  }

  // Для объектов восстанавливаем все вложенные поля
  if (field.type === "object" && field.fields) {
    if (field.originalFields) {
      // Если есть оригинальные поля, полностью восстанавливаем их
      for (const key in field.originalFields) {
        if (!field.fields[key]) continue;

        field.fields[key] = safeClone(field.originalFields[key]);
        resetFieldRecursively(field.fields[key]);
      }
    } else {
      // Просто рекурсивно сбрасываем флаги модификации
      for (const key in field.fields) {
        resetFieldRecursively(field.fields[key]);
      }
    }
  }
  // Для массивов восстанавливаем все элементы
  else if (field.type === "array" && Array.isArray(field.data)) {
    if (field.originalData && Array.isArray(field.originalData)) {
      // Если есть оригинальные данные, восстанавливаем из них
      field.data = safeClone(field.originalData);

      // И затем также сбрасываем флаги модификации у всех элементов
      field.data.forEach((item) => {
        if (typeof item === "object" && item) {
          resetFieldRecursively(item);
        }
      });
    } else {
      // Если нет оригинальных данных, просто сбрасываем флаги
      field.data.forEach((item) => {
        if (typeof item === "object" && item) {
          resetFieldRecursively(item);
        }
      });
    }
  }
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

// Reset all array items
function resetAllArrayItems() {
  if (props.fieldSchema.type !== "array" || !props.fieldSchema.originalData)
    return;

  // Делаем глубокую копию оригинальных данных
  const resetData = safeClone(props.fieldSchema.originalData);

  // Сбрасываем флаг модификации у всех элементов
  if (Array.isArray(resetData)) {
    for (const item of resetData) {
      if (typeof item === "object" && item) {
        // Принудительно устанавливаем флаг isModified в false
        item.isModified = false;
        resetFieldRecursively(item);
      }
    }
  }

  // Обновляем через emit
  emit("update:modelValue", {
    ...props.fieldSchema,
    data: resetData,
    isModified: false,
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

  // Обязательно сбрасываем флаг модификации
  resetItem.isModified = false;

  // Рекурсивно сбрасываем все вложенные поля
  resetFieldRecursively(resetItem);

  // Обновляем элемент в массиве
  updateArrayItem(idx, resetItem);
}
</script>

<template>
  <UFormField
    v-if="fieldSchema.type === 'input'"
    :label="fieldSchema.label"
    class="mb-4"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-1">
        <div v-if="fieldKey" class="text-xs text-gray-500">
          Key: <code class="bg-gray-100 px-1 rounded">{{ fieldKey }}</code>
        </div>
        <!-- Modification indicator -->
        <div v-if="fieldSchema.isModified" class="flex items-center text-xs">
          <span class="text-amber-600 font-medium flex items-center">
            <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
            Modified
          </span>
          <UTooltip text="Reset to original value">
            <UButton
              v-if="fieldSchema.originalData !== undefined"
              size="xs"
              color="neutral"
              variant="ghost"
              class="ml-1"
              @click="resetField"
            >
              <UIcon name="i-lucide-undo" class="h-3 w-3 mr-1" />
              Reset
            </UButton>
          </UTooltip>
        </div>
      </div>
      <UInput
        :model-value="fieldSchema.data"
        :placeholder="fieldSchema.placeholder"
        :class="{
          'border-amber-300 focus:border-amber-500': fieldSchema.isModified,
        }"
        @update:model-value="(val) => update({ ...fieldSchema, data: val })"
      />
    </div>
  </UFormField>

  <!-- Multiline input -->
  <UFormField
    v-else-if="fieldSchema.type === 'textarea'"
    :label="fieldSchema.label"
    class="mb-4"
  >
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-1">
        <div v-if="fieldKey" class="text-xs text-gray-500">
          Key: <code class="bg-gray-100 px-1 rounded">{{ fieldKey }}</code>
        </div>
        <!-- Modification indicator -->
        <div v-if="fieldSchema.isModified" class="flex items-center text-xs">
          <span class="text-amber-600 font-medium flex items-center">
            <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
            Modified
          </span>
          <UTooltip text="Reset to original value">
            <UButton
              v-if="fieldSchema.originalData !== undefined"
              size="xs"
              color="neutral"
              variant="ghost"
              class="ml-1"
              @click="resetField"
            >
              <UIcon name="i-lucide-undo" class="h-3 w-3 mr-1" />
              Reset
            </UButton>
          </UTooltip>
        </div>
      </div>
      <UTextarea
        :model-value="fieldSchema.data"
        :placeholder="fieldSchema.placeholder"
        :rows="4"
        :class="{
          'border-amber-300 focus:border-amber-500': fieldSchema.isModified,
        }"
        @update:model-value="(val) => update({ ...fieldSchema, data: val })"
      />
    </div>
  </UFormField>

  <!-- Array of objects/strings -->
  <div
    v-else-if="fieldSchema.type === 'array'"
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

  <!-- Object with nested fields -->
  <div
    v-else-if="fieldSchema.type === 'object'"
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
      </div>
      <div class="flex space-x-2">
        <!-- Reset all object fields button -->
        <UTooltip text="Reset all fields to original values">
          <UButton
            v-if="fieldSchema.isModified || hasModifiedChildFields()"
            size="sm"
            color="neutral"
            variant="soft"
            @click="resetAllChildFields"
          >
            <UIcon name="i-lucide-undo" class="mr-1" />
            Reset All
          </UButton>
        </UTooltip>

        <UButton
          size="sm"
          color="primary"
          variant="soft"
          @click="showAddFormObj = true"
        >
          <UIcon name="uil:plus" class="mr-1" />
          Add Field
        </UButton>
      </div>
    </div>

    <!-- Object modification indicator -->
    <div
      v-if="fieldSchema.isModified"
      class="bg-amber-100 p-2 rounded mb-3 text-xs text-amber-600 font-medium flex items-center"
    >
      <UIcon name="i-lucide-edit" class="h-3 w-3 mr-1" />
      Object structure has been modified
      <UTooltip text="Reset object structure to original">
        <UButton
          v-if="fieldSchema.originalFields !== undefined"
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

    <!-- Form for adding a new field -->
    <AddFieldForm
      v-if="showAddFormObj"
      :existing-keys="getExistingKeys()"
      title="Add New Field"
      @add="addObjectField"
      @cancel="showAddFormObj = false"
    />

    <!-- Empty state -->
    <div
      v-if="!fieldSchema.fields || Object.keys(fieldSchema.fields).length === 0"
      class="text-center py-6 text-gray-500"
    >
      Object is empty. Add fields using the button above.
    </div>

    <!-- Object fields -->
    <template v-else-if="fieldSchema.fields">
      <div
        v-for="(child, key) in fieldSchema.fields"
        :key="key"
        class="mb-4 relative bg-white p-4 rounded-md"
        :class="{ 'border-amber-300 border': child.isModified }"
      >
        <div class="flex justify-between items-start">
          <div class="pt-2 pb-1 text-xs text-gray-500">
            Key: <code class="bg-gray-100 px-1 rounded">{{ key }}</code>
            <span
              v-if="child.isModified"
              class="ml-2 text-amber-600 font-medium"
            >
              <UIcon name="i-lucide-edit" class="h-3 w-3 inline mr-1" />
              Modified
            </span>
          </div>

          <div class="flex">
            <!-- Reset field button -->
            <UTooltip text="Reset this field to original value">
              <UButton
                v-if="
                  child.isModified &&
                  fieldSchema.originalFields &&
                  fieldSchema.originalFields[key]
                "
                size="xs"
                color="neutral"
                variant="ghost"
                class="mr-1"
                @click="resetObjectField(key)"
              >
                <UIcon name="i-lucide-undo" class="h-3 w-3" />
              </UButton>
            </UTooltip>

            <!-- Delete field button -->
            <UButton
              size="xs"
              color="error"
              variant="ghost"
              icon="i-lucide-trash-2"
              @click="removeObjectField(key)"
            />
          </div>
        </div>

        <DynamicField
          :field-schema="child"
          :field-key="key"
          :model-value="child"
          @update:model-value="
            (val) => {
              // Update nested field
              const updatedFields = { ...fieldSchema.fields };
              updatedFields[key] = val;

              // Update entire schema
              update({
                ...props.fieldSchema,
                fields: updatedFields,
              });
            }
          "
        />
      </div>
    </template>
  </div>
</template>
