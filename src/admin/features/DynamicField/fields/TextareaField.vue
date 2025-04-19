<!-- ~/admin/features/DynamicField/ui/fields/TextareaField.vue -->
<script setup lang="ts">
import type { FieldEditorProps } from "~/admin/entities/ContentField/model/types";
import ModificationIndicator from "~/admin/features/DynamicField/ui/shared/ModificationIndicator.vue";

const props = defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

const update = (val: string) => {
  // Set modification flag on update
  emit("update:modelValue", {
    ...props.fieldSchema,
    data: val,
    isModified: true,
  });
};

// Reset field to original value
function resetField() {
  if (props.fieldSchema.originalData === undefined) return;

  emit("update:modelValue", {
    ...props.fieldSchema,
    data: props.fieldSchema.originalData,
    isModified: false,
  });
}
</script>

<template>
  <UFormField :label="fieldSchema.label" class="mb-4">
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-1">
        <div v-if="fieldKey" class="text-xs text-gray-500">
          Key: <code class="bg-gray-100 px-1 rounded">{{ fieldKey }}</code>
        </div>

        <ModificationIndicator
          :is-modified="!!fieldSchema.isModified"
          :has-original-data="fieldSchema.originalData !== undefined"
          @reset="resetField"
        />
      </div>

      <UTextarea
        :model-value="fieldSchema.data"
        :placeholder="fieldSchema.placeholder"
        :rows="4"
        :class="{
          'border-amber-300 focus:border-amber-500': fieldSchema.isModified,
        }"
        @update:model-value="update"
      />
    </div>
  </UFormField>
</template>
