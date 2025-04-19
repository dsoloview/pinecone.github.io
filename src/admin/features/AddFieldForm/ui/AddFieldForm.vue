<!-- src/admin/features/AddField/ui/AddFieldForm.vue -->
<script setup lang="ts">
import { ref } from "vue";
import type { FieldType } from "~/admin/entities/ContentField/model/types";

interface Props {
  onAdd: (key: string, label: string, type: FieldType) => void;
  onCancel: () => void;
  existingKeys?: string[];
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Добавить новое поле",
  existingKeys: () => [],
});

const fieldKey = ref("");
const fieldLabel = ref("");
const fieldType = ref<FieldType>("input");

const fieldTypes = [
  { label: "Текст (короткий)", value: "input" },
  { label: "Текст (длинный)", value: "textarea" },
  { label: "Объект", value: "object" },
  { label: "Массив", value: "array" },
];

function validateAndSubmit() {
  if (!fieldKey.value.trim()) return;

  if (props.existingKeys.includes(fieldKey.value)) {
    alert("Поле с таким ключом уже существует");
    return;
  }

  props.onAdd(fieldKey.value, fieldLabel.value, fieldType.value);
  fieldKey.value = "";
  fieldLabel.value = "";
  fieldType.value = "input";
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
    <h3 class="text-lg font-medium mb-4">{{ title }}</h3>
    <div class="grid grid-cols-3 gap-4">
      <UFormField label="Ключ поля">
        <UInput v-model="fieldKey" placeholder="Введите ключ поля" />
      </UFormField>

      <UFormField label="Название поля">
        <UInput v-model="fieldLabel" placeholder="Введите название поля" />
      </UFormField>

      <UFormField label="Тип поля">
        <USelect v-model="fieldType" :items="fieldTypes" />
      </UFormField>

      <div class="flex items-end">
        <UButton
          block
          color="primary"
          :disabled="!fieldKey.trim()"
          @click="validateAndSubmit"
        >
          Добавить
        </UButton>
      </div>
    </div>
    <div class="mt-3 flex justify-end">
      <UButton size="xs" variant="ghost" @click="onCancel"> Отмена </UButton>
    </div>
  </div>
</template>
