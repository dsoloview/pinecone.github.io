<!-- src/admin/widgets/AdminPagesContentEditor/ui/AdminPagesContentEditor.vue -->
<script setup lang="ts">
import { ref, watch } from "vue";
import AddFieldForm from "~/admin/features/AddFieldForm/ui/AddFieldForm.vue";
import DynamicField from "~/admin/features/DynamicField/ui/DynamicField.vue";
import { createField, safeClone } from "~/admin/shared/lib/fieldHelpers";
import type {
  ContentEditorProps,
  FieldType,
  AnyFieldSchema,
} from "~/admin/entities/ContentField/model/types";

const props = defineProps<ContentEditorProps>();
const emit = defineEmits(["update:content"]);

// Создаем реактивную копию контента для локального редактирования
const localContent = ref(safeClone(props.content));

// Следим за изменениями входящего контента
watch(
  () => props.content,
  (newContent) => {
    localContent.value = safeClone(newContent);
  },
  { deep: true },
);

// Форма добавления нового поля
const showAddForm = ref(false);

// Обработчик обновления поля в контенте
function updateField(key: string, updatedField: AnyFieldSchema) {
  // Обновляем локальную копию
  localContent.value[key] = updatedField;
  emitContentUpdate();
}

// Добавление нового поля в корень объекта
function addRootField(key: string, label: string, type: FieldType) {
  // Создаем новое поле
  const newField = createField(key, label, type);

  // Добавляем новое поле в корень объекта
  localContent.value[key] = newField;

  // Эмитим обновление контента
  emitContentUpdate();
  showAddForm.value = false;
}

// Удаление поля из корня объекта
function removeRootField(key: string) {
  const updatedContent = { ...localContent.value };
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete updatedContent[key];

  localContent.value = updatedContent;
  emitContentUpdate();
}

// Отправка обновленного контента
function emitContentUpdate() {
  emit("update:content", safeClone(localContent.value));
}

// Получение существующих ключей для валидации
function getExistingKeys(): string[] {
  return Object.keys(localContent.value);
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <!-- Заголовок и добавление нового поля -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">
        Редактирование контента
        <UBadge size="sm" color="info" class="ml-2">{{
          props.language.label
        }}</UBadge>
      </h2>
      <UButton color="primary" icon="i-lucide-plus" @click="showAddForm = true">
        Добавить новое поле
      </UButton>
    </div>

    <!-- Форма добавления нового поля в корень -->
    <div
      v-if="showAddForm"
      class="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-inner"
    >
      <AddFieldForm
        :existing-keys="getExistingKeys()"
        title="Добавить новое поле"
        @add="addRootField"
        @cancel="showAddForm = false"
      />
    </div>

    <!-- Отображение полей -->
    <div v-if="Object.keys(localContent).length > 0" class="space-y-6">
      <div
        v-for="(fieldSchema, key) in localContent"
        :key="key"
        class="relative root-field-container p-6 rounded-xl bg-gray-50 border border-gray-200"
      >
        <!-- Заголовок и кнопка удаления корневого поля -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-medium text-gray-700 flex items-center">
            <UBadge size="sm" color="neutral" class="mr-2 font-mono">{{
              key
            }}</UBadge>
            {{ fieldSchema.label }}
          </h3>

          <UButton
            size="xs"
            color="error"
            variant="soft"
            icon="i-lucide-trash-2"
            @click="removeRootField(key)"
          >
            Удалить
          </UButton>
        </div>

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
      v-else
      class="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300"
    >
      <UIcon
        name="i-lucide-file-plus"
        class="text-5xl text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-700 mb-2">Нет полей</h3>
      <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        Добавьте новые поля для настройки контента страницы. Вы можете создавать
        текстовые поля, массивы, объекты и другие типы данных.
      </p>
      <UButton color="primary" icon="i-lucide-plus" @click="showAddForm = true">
        Добавить поле
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.root-field-container {
  transition: all 0.2s ease-in-out;
}

.root-field-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
