<script setup lang="ts">
import type {
  FieldEditorProps,
  AnyFieldSchema,
} from "~/admin/entities/ContentField/model/types";
import InputField from "~/admin/features/DynamicField/fields/InputField.vue";
import TextareaField from "~/admin/features/DynamicField/fields/TextareaField.vue";
import ArrayField from "~/admin/features/DynamicField/fields/ArrayField.vue";
import ObjectField from "~/admin/features/DynamicField/fields/ObjectField.vue";

defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

const update = (val: AnyFieldSchema) => {
  emit("update:modelValue", val);
};

// Функция для определения цвета фона в зависимости от типа поля
const getFieldBgColor = (type: string): string => {
  switch (type) {
    case "input":
      return "bg-blue-50";
    case "textarea":
      return "bg-violet-50";
    case "array":
      return "bg-amber-50";
    case "object":
      return "bg-emerald-50";
    default:
      return "bg-gray-50";
  }
};

// Функция для определения цвета индикатора типа
const getTypeIndicatorColor = (type: string): string => {
  switch (type) {
    case "input":
      return "bg-blue-500";
    case "textarea":
      return "bg-violet-500";
    case "array":
      return "bg-amber-500";
    case "object":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};

// Функция для получения иконки типа поля
const getTypeIcon = (type: string): string => {
  switch (type) {
    case "input":
      return "i-lucide-text";
    case "textarea":
      return "i-lucide-file-text";
    case "array":
      return "i-lucide-list";
    case "object":
      return "i-lucide-package";
    default:
      return "i-lucide-help-circle";
  }
};
</script>

<template>
  <div
    :class="[
      'field-wrapper p-3 rounded-xl shadow-sm border border-gray-200 relative',
      getFieldBgColor(fieldSchema.type),
    ]"
  >
    <!-- Индикатор типа поля -->
    <div
      class="absolute top-0 left-0 h-full w-1.5 rounded-l-xl"
      :class="getTypeIndicatorColor(fieldSchema.type)"
    />

    <!-- Заголовок типа поля (для всех типов) -->
    <div
      class="flex items-center mb-2 ml-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      <UIcon :name="getTypeIcon(fieldSchema.type)" class="mr-1 text-sm" />
      {{ fieldSchema.type }}
    </div>

    <div class="ml-3">
      <InputField
        v-if="fieldSchema.type === 'input'"
        :field-schema="fieldSchema"
        :field-key="fieldKey"
        :model-value="modelValue"
        @update:model-value="update"
      />

      <TextareaField
        v-else-if="fieldSchema.type === 'textarea'"
        :field-schema="fieldSchema"
        :field-key="fieldKey"
        :model-value="modelValue"
        @update:model-value="update"
      />

      <ArrayField
        v-else-if="fieldSchema.type === 'array'"
        :field-schema="fieldSchema"
        :field-key="fieldKey"
        :model-value="modelValue"
        @update:model-value="update"
      />

      <ObjectField
        v-else-if="fieldSchema.type === 'object'"
        :field-schema="fieldSchema"
        :field-key="fieldKey"
        :model-value="modelValue"
        @update:model-value="update"
      />
    </div>
  </div>
</template>

<style scoped>
.field-wrapper {
  transition: all 0.2s ease-in-out;
}

.field-wrapper:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
