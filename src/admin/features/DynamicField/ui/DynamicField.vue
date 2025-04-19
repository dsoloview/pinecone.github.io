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
</script>

<template>
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
</template>
