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
function addRootField(key: string, type: FieldType) {
  // Создаем новое поле
  const newField = createField(key, type);

  // Добавляем новое поле в корень объекта
  localContent.value[key] = newField;

  // Эмитим обновление контента
  emitContentUpdate();
  showAddForm.value = false;
}

// Удаление поля из корня объекта
function removeRootField(key: string) {
  const updatedContent = { ...localContent.value };
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
  <div>
    <!-- Заголовок и добавление нового поля -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Редактирование контента</h2>
      <UButton color="primary" size="sm" @click="showAddForm = true">
        <UIcon name="uil:plus" class="mr-1" />
        Добавить новое поле
      </UButton>
    </div>

    <!-- Форма добавления нового поля в корень -->
    <AddFieldForm
      v-if="showAddForm"
      :existing-keys="getExistingKeys()"
      title="Добавить новое поле"
      @add="addRootField"
      @cancel="showAddForm = false"
    />

    <!-- Отображение полей -->
    <div v-if="Object.keys(localContent).length > 0" class="space-y-6">
      <div
        v-for="(fieldSchema, key) in localContent"
        :key="key"
        class="relative"
      >
        <!-- Кнопка удаления корневого поля -->
        <UButton
          size="xs"
          color="error"
          variant="soft"
          icon="i-lucide-trash-2"
          class="absolute top-2 right-2 z-10"
          @click="removeRootField(key)"
        />

        <DynamicField
          :field-key="key"
          :field-schema="fieldSchema"
          :model-value="fieldSchema"
          @update:model-value="(val) => updateField(key, val)"
        />
      </div>
    </div>

    <!-- Пустое состояние -->
    <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
      <UIcon
        name="i-lucide-file-plus"
        class="text-4xl text-gray-400 mx-auto mb-3"
      />
      <h3 class="text-lg font-medium text-gray-700 mb-2">Нет полей</h3>
      <p class="text-sm text-gray-500 mb-4">
        Добавьте новые поля для настройки контента страницы
      </p>
      <UButton color="primary" @click="showAddForm = true">
        <UIcon name="uil:plus" class="mr-1" />
        Добавить поле
      </UButton>
    </div>
  </div>
</template>
