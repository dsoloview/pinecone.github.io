<!-- ~/admin/features/DynamicField/ui/fields/ObjectField.vue -->
<script setup lang="ts">
import { ref } from "vue";
import AddFieldForm from "~/admin/features/AddFieldForm/ui/AddFieldForm.vue";
import { createField, safeClone } from "~/admin/shared/lib/fieldHelpers";
import type {
  FieldEditorProps,
  FieldType,
  AnyFieldSchema,
} from "~/admin/entities/ContentField/model/types";
import { resetFieldRecursively } from "~/admin/features/DynamicField/utils/fieldUtils";
import DynamicField from "~/admin/features/DynamicField/ui/DynamicField.vue";

const props = defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

// State for adding new fields forms
const showAddFormObj = ref(false);

const update = (val: AnyFieldSchema) => {
  // Set modification flag on update
  const modifiedVal = {
    ...val,
    isModified: true,
  };
  emit("update:modelValue", modifiedVal);
};

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

// Reset field to original value (structure)
function resetField() {
  if (props.fieldSchema.type !== "object" || !props.fieldSchema.originalFields)
    return;

  const resetFields = safeClone(props.fieldSchema.originalFields);

  emit("update:modelValue", {
    ...props.fieldSchema,
    fields: resetFields,
    isModified: false,
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

function resetObjectField(key: string) {
  if (
    props.fieldSchema.type !== "object" ||
    !props.fieldSchema.fields ||
    !props.fieldSchema.originalFields ||
    !props.fieldSchema.originalFields[key]
  )
    return;

  const updatedFields = { ...props.fieldSchema.fields };

  // Replace the field with its original version
  updatedFields[key] = safeClone(props.fieldSchema.originalFields[key]);

  // Сохраняем оригинальные данные
  if (props.fieldSchema.fields[key].originalData !== undefined) {
    updatedFields[key].originalData =
      props.fieldSchema.fields[key].originalData;
  }
  if (props.fieldSchema.fields[key].originalFields) {
    updatedFields[key].originalFields =
      props.fieldSchema.fields[key].originalFields;
  }

  // Reset modification flag
  updatedFields[key].isModified = false;

  // Рекурсивно сбрасываем вложенные поля
  resetFieldRecursively(updatedFields[key]);

  update({
    ...props.fieldSchema,
    fields: updatedFields,
  });
}

// Reset all child fields in object
// Reset all child fields in object
function resetAllChildFields() {
  if (props.fieldSchema.type !== "object" || !props.fieldSchema.fields) return;

  if (!props.fieldSchema.originalFields) return;

  const resetFields = safeClone(props.fieldSchema.originalFields);

  // Для каждого поля обновляем originalData/originalFields
  for (const key in resetFields) {
    const field = resetFields[key];
    if (!field) continue;

    // Сбрасываем флаг модификации
    field.isModified = false;

    // Переустанавливаем originalData/originalFields
    if (field.type === "input" || field.type === "textarea") {
      field.originalData = field.data;
    } else if (field.type === "object" && field.fields) {
      field.originalFields = safeClone(field.fields);

      // Рекурсивно обрабатываем вложенные поля
      for (const childKey in field.fields) {
        const tempObj = { [childKey]: field.fields[childKey] };
        initObjectOriginalData(tempObj);
        field.fields[childKey] = tempObj[childKey];
      }
    } else if (field.type === "array" && Array.isArray(field.data)) {
      field.originalData = safeClone(field.data);

      // Рекурсивно обрабатываем элементы массива
      for (const item of field.data) {
        if (item) {
          resetFieldRecursively(item);
        }
      }
    }
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

  emit("update:modelValue", {
    ...props.fieldSchema,
    fields: resetFields,
    isModified: false,
    originalFields: safeClone(resetFields), // Обновляем originalFields
  });
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
