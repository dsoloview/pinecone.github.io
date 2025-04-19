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

const localArrayData = ref(props.modelValue.data || []);
const showAddForm = ref(false);
const expandedState = ref(true);

// Вычисляемое свойство для отслеживания количества элементов
const itemCount = computed(() => localArrayData.value.length);

// Функция для обновления значения
function updateField() {
  const updatedField = {
    ...props.modelValue,
    data: localArrayData.value,
    isModified: true,
  };
  emit("update:modelValue", updatedField);
}

// Добавление нового элемента в массив
function addArrayItem(key: string, type: FieldType) {
  const newItem = createField(key, type);
  localArrayData.value.push(newItem);
  updateField();
  showAddForm.value = false;
}

// Удаление элемента из массива
function removeArrayItem(index: number) {
  localArrayData.value.splice(index, 1);
  updateField();
}

// Перемещение элемента вверх
function moveItemUp(index: number) {
  if (index > 0) {
    const temp = localArrayData.value[index];
    localArrayData.value[index] = localArrayData.value[index - 1];
    localArrayData.value[index - 1] = temp;
    updateField();
  }
}

// Перемещение элемента вниз
function moveItemDown(index: number) {
  if (index < localArrayData.value.length - 1) {
    const temp = localArrayData.value[index];
    localArrayData.value[index] = localArrayData.value[index + 1];
    localArrayData.value[index + 1] = temp;
    updateField();
  }
}

// Обновление элемента массива
function updateArrayItem(index: number, updatedItem: AnyFieldSchema) {
  localArrayData.value[index] = updatedItem;
  updateField();
}

// Переключение состояния развернутости
function toggleExpanded() {
  expandedState.value = !expandedState.value;
}
</script>

<template>
  <div class="array-field-container">
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
          <UBadge size="xs" color="amber" class="ml-2 font-normal"
            >{{ itemCount }} {{ itemCount === 1 ? "item" : "items" }}</UBadge
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
            Добавить
          </UButton>
        </div>
      </div>
    </div>

    <!-- Форма добавления элемента -->
    <div
      v-if="showAddForm"
      class="mb-4 p-4 bg-white rounded-lg border border-amber-200 shadow-sm"
    >
      <AddFieldForm
        :existing-keys="[]"
        title="Добавить элемент массива"
        @add="addArrayItem"
        @cancel="showAddForm = false"
      />
    </div>

    <!-- Список элементов массива -->
    <div v-if="expandedState" class="space-y-4">
      <div
        v-for="(item, index) in localArrayData"
        :key="index"
        class="relative array-item p-4 pt-8 bg-white rounded-lg border border-amber-200 shadow-sm"
      >
        <!-- Элементы управления -->
        <div class="absolute right-2 top-2 flex items-center space-x-1 z-20">
          <UBadge size="xs" color="gray" class="mr-1">{{ index + 1 }}</UBadge>

          <UButton
            size="xs"
            color="gray"
            variant="soft"
            icon="i-lucide-arrow-up"
            :disabled="index === 0"
            @click="moveItemUp(index)"
          />

          <UButton
            size="xs"
            color="gray"
            variant="soft"
            icon="i-lucide-arrow-down"
            :disabled="index === localArrayData.length - 1"
            @click="moveItemDown(index)"
          />

          <UButton
            size="xs"
            color="error"
            variant="soft"
            icon="i-lucide-trash-2"
            @click="removeArrayItem(index)"
          />
        </div>

        <!-- Элемент массива -->
        <DynamicField
          :field-key="`item-${index}`"
          :field-schema="item"
          :model-value="item"
          @update:model-value="(val) => updateArrayItem(index, val)"
        />
      </div>
    </div>

    <!-- Пустое состояние -->
    <div
      v-if="expandedState && localArrayData.length === 0"
      class="text-center py-6 bg-white border border-dashed border-amber-200 rounded-lg"
    >
      <UIcon name="i-lucide-list" class="text-2xl text-amber-300 mb-2" />
      <div class="text-sm text-gray-500">Массив пуст</div>
      <UButton
        size="sm"
        color="primary"
        variant="soft"
        class="mt-2"
        @click="showAddForm = true"
      >
        Добавить элемент
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.array-item {
  transition: all 0.2s ease-in-out;
}

.array-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
