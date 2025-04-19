<script setup lang="ts">
import { ref, computed } from "vue";
import DynamicField from "~/admin/features/DynamicField/ui/DynamicField.vue";
import AddFieldForm from "~/admin/features/AddFieldForm/ui/AddFieldForm.vue";
import { createField } from "~/admin/shared/lib/fieldHelpers";
import type {
  FieldEditorProps,
  FieldType,
  AnyFieldSchema,
} from "~/admin/entities/ContentField/model/types";

const props = defineProps<FieldEditorProps>();
const emit = defineEmits(["update:modelValue"]);

const localFields = ref(props.modelValue.fields || {});
const showAddForm = ref(false);
const expandedState = ref(true);

// Вычисляемое свойство для отслеживания количества полей
const fieldCount = computed(() => Object.keys(localFields.value).length);

// Функция для обновления значения
function updateObject() {
  const updatedField = {
    ...props.modelValue,
    fields: localFields.value,
    isModified: true,
  };
  emit("update:modelValue", updatedField);
}

// Добавление нового поля в объект
function addObjectField(key: string, type: FieldType) {
  const newField = createField(key, type);
  localFields.value[key] = newField;
  updateObject();
  showAddForm.value = false;
}

// Удаление поля из объекта
function removeObjectField(key: string) {
  const updatedFields = { ...localFields.value };
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete updatedFields[key];
  localFields.value = updatedFields;
  updateObject();
}

// Обновление поля объекта
function updateField(key: string, updatedField: AnyFieldSchema) {
  localFields.value[key] = updatedField;
  updateObject();
}

// Получение существующих ключей для валидации
function getExistingKeys(): string[] {
  return Object.keys(localFields.value);
}

// Переключение состояния развернутости
function toggleExpanded() {
  expandedState.value = !expandedState.value;
}
</script>

<template>
  <div class="object-field-container">
    <!-- Заголовок поля -->
    <div class="mb-3">
      <div class="flex items-center justify-between">
        <div class="font-medium text-gray-700 flex items-center">
          <UButton
            size="xs"
            color="gray"
            variant="ghost"
            :icon="
              expandedState ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'
            "
            class="mr-1"
            @click="toggleExpanded"
          />
          {{ fieldSchema.label }}
          <UBadge size="xs" color="emerald" class="ml-2 font-normal"
            >{{ fieldCount }}
            {{ fieldCount === 1 ? "field" : "fields" }}</UBadge
          >
        </div>

        <div class="flex items-center space-x-2">
          <UButton
            size="xs"
            color="primary"
            variant="soft"
            icon="i-lucide-plus"
            @click="showAddForm = true"
          >
            Добавить поле
          </UButton>
        </div>
      </div>
    </div>

    <!-- Форма добавления поля -->
    <div
      v-if="showAddForm"
      class="mb-4 p-4 bg-white rounded-lg border border-emerald-200 shadow-sm"
    >
      <AddFieldForm
        :existing-keys="getExistingKeys()"
        title="Добавить поле объекта"
        @add="addObjectField"
        @cancel="showAddForm = false"
      />
    </div>

    <!-- Поля объекта -->
    <div v-if="expandedState" class="space-y-4">
      <div
        v-for="(fieldSchema, key) in localFields"
        :key="key"
        class="relative object-field p-4 pt-8 bg-white rounded-lg border border-emerald-200 shadow-sm"
      >
        <!-- Заголовок и кнопка удаления -->
        <div class="absolute right-2 top-2 flex items-center space-x-1 z-20">
          <UBadge size="xs" color="gray" class="px-2 font-mono">{{
            key
          }}</UBadge>

          <UButton
            size="xs"
            color="error"
            variant="soft"
            icon="i-lucide-trash-2"
            @click="removeObjectField(key)"
          />
        </div>

        <!-- Поле объекта -->
        <DynamicField
          :field-key="key"
          :field-schema="fieldSchema"
          :model-value="fieldSchema"
          @update:model-value="(val) => updateField(key, val)"
        />
      </div>
    </div>

    <!-- Пустое состояние -->
    <div
      v-if="expandedState && fieldCount === 0"
      class="text-center py-6 bg-white border border-dashed border-emerald-200 rounded-lg"
    >
      <UIcon name="i-lucide-package" class="text-2xl text-emerald-300 mb-2" />
      <div class="text-sm text-gray-500">Объект пуст</div>
      <UButton
        size="sm"
        color="primary"
        variant="soft"
        class="mt-2"
        @click="showAddForm = true"
      >
        Добавить поле
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.object-field {
  transition: all 0.2s ease-in-out;
}

.object-field:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
