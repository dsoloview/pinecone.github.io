<script setup lang="ts">
import { ref, watch } from "vue";
import AdminPagesContentEditor from "~/admin/widgets/AdminPagesContentEditor/ui/AdminPagesContentEditor.vue";
import type { TabsItem } from "#ui/components/Tabs.vue";
import type { AnyFieldSchema } from "~/admin/entities/ContentField/model/types";
import {
  fetchPageContent,
  savePageContent,
} from "~/admin/entities/PageContent/api/pageContentApi";
import { safeClone } from "~/admin/shared/lib/fieldHelpers";

const route = useRoute();
const toast = useToast();
const slug = route.params.slug as string;

const isLoading = ref(true);
const isSaving = ref(false);
const isResetting = ref(false);

const tabs = ref<TabsItem[]>([
  { name: "en", label: "English" },
  { name: "sr", label: "Srpski" },
]);
const activeLanguage = ref("0");

const pageContent = ref<Record<string, AnyFieldSchema>>({});
const originalPageContent = ref<Record<string, AnyFieldSchema>>({});

// Загрузка контента
async function loadPageContent() {
  try {
    isLoading.value = true;
    const content = await fetchPageContent(slug);

    if (content) {
      pageContent.value = content;
      // Создаем глубокую копию данных только если контент существует
      originalPageContent.value = safeClone(content);
      initializeOriginalData(pageContent.value);
    }
  } catch (error) {
    console.error("Ошибка загрузки контента:", error);
    toast.add({
      title: "Ошибка загрузки",
      description: "Не удалось загрузить содержимое страницы",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

async function savePage() {
  if (isSaving.value) return;

  try {
    isSaving.value = true;

    const result = await savePageContent({
      slug,
      language: tabs.value[activeLanguage.value].name,
      content: pageContent.value,
    });

    if (result) {
      // Обновляем оригинальный контент после успешного сохранения
      originalPageContent.value = safeClone(pageContent.value);

      // Сбрасываем флаги модификации для всех полей
      resetModificationFlags(pageContent.value);

      toast.add({
        title: "Успешно сохранено",
        description: "Контент страницы был успешно сохранен",
        color: "green",
      });
    } else {
      toast.add({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить контент страницы",
        color: "red",
      });
    }
  } catch (error) {
    toast.add({
      title: "Ошибка",
      description: "Произошла ошибка при сохранении",
      color: "red",
    });
    console.error("Ошибка при сохранении страницы:", error);
  } finally {
    isSaving.value = false;
  }
}

// Функция для сброса всех изменений
function resetAllChanges() {
  if (isResetting.value) return;

  try {
    isResetting.value = true;

    // Восстанавливаем из оригинальной копии (безопасно)
    pageContent.value = safeClone(originalPageContent.value);

    toast.add({
      title: "Изменения сброшены",
      description: "Все изменения были отменены",
      color: "blue",
    });
  } catch (error) {
    toast.add({
      title: "Ошибка",
      description: "Не удалось сбросить изменения",
      color: "red",
    });
    console.error("Ошибка при сбросе изменений:", error);
  } finally {
    isResetting.value = false;
  }
}

// Рекурсивно сбрасываем флаги модификации полей
function resetModificationFlags(content: Record<string, AnyFieldSchema>) {
  if (!content) return;

  for (const key in content) {
    const field = content[key];
    if (!field) continue;

    field.isModified = false;

    // Обрабатываем вложенные поля для объектов
    if (field.type === "object" && field.fields) {
      for (const childKey in field.fields) {
        if (field.fields[childKey]) {
          field.fields[childKey].isModified = false;

          // Рекурсивно обрабатываем более глубокие вложенности
          if (
            field.fields[childKey].type === "object" &&
            field.fields[childKey].fields
          ) {
            resetModificationFlags({ [childKey]: field.fields[childKey] });
          }
        }
      }
    }

    // Обрабатываем элементы массива
    if (field.type === "array" && Array.isArray(field.data)) {
      field.data.forEach((item) => {
        if (typeof item === "object" && item) {
          item.isModified = false;

          // Для вложенных объектов в массиве
          if (item.type === "object" && item.fields) {
            for (const itemKey in item.fields) {
              if (item.fields[itemKey]) {
                item.fields[itemKey].isModified = false;
              }
            }
          }
        }
      });
    }
  }
}

// Проверка наличия модифицированных полей
function hasModifiedFields(): boolean {
  if (!pageContent.value) return false;

  for (const key in pageContent.value) {
    const field = pageContent.value[key];
    if (field && field.isModified) {
      return true;
    }
  }
  return false;
}

function updatePageContent(newContent: Record<string, AnyFieldSchema>) {
  pageContent.value = newContent;
}

// Инициализация оригинальных данных для полей
function initializeOriginalData(content: Record<string, AnyFieldSchema>) {
  if (!content) return;

  for (const key in content) {
    const field = content[key];
    if (!field) continue;

    // Для строковых полей сохраняем оригинальные данные
    if (field.type === "input" || field.type === "textarea") {
      field.originalData = field.data;
    }
    // Для массивов сохраняем оригинальные элементы
    else if (field.type === "array") {
      // Используем safeClone вместо structuredClone
      field.originalData = safeClone(field.data || []);

      // Для каждого элемента массива также инициализируем originalData
      if (Array.isArray(field.data)) {
        field.data.forEach((item) => {
          if (typeof item === "object" && item) {
            if (item.type === "input" || item.type === "textarea") {
              item.originalData = item.data;
            } else if (item.type === "object" && item.fields) {
              item.originalFields = safeClone(item.fields);
            }
          }
        });
      }
    }
    // Для объектов сохраняем оригинальную структуру полей
    else if (field.type === "object" && field.fields) {
      field.originalFields = safeClone(field.fields);

      // Рекурсивно обрабатываем вложенные поля
      for (const childKey in field.fields) {
        if (field.fields[childKey]) {
          const childField = { [childKey]: field.fields[childKey] };
          initializeOriginalData(childField);
        }
      }
    }
  }
}

// Загружаем контент при изменении slug или языка
watch(
  [() => route.params.slug, () => activeLanguage.value],
  async () => {
    await loadPageContent();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex-1 bg-gray-100">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ slug }}</h2>
        <div class="flex space-x-3">
          <UButton
            v-if="hasModifiedFields()"
            color="gray"
            variant="soft"
            :loading="isResetting"
            :disabled="isSaving || isResetting"
            @click="resetAllChanges"
          >
            <UIcon name="i-lucide-rotate-ccw" class="mr-1" />
            {{ isResetting ? "Сброс..." : "Сбросить изменения" }}
          </UButton>
          <UButton
            color="primary"
            class="px-6"
            :loading="isSaving"
            :disabled="isSaving || isResetting"
            @click="savePage"
          >
            {{ isSaving ? "Сохранение..." : "Сохранить" }}
          </UButton>
        </div>
      </div>

      <UTabs v-model="activeLanguage" :items="tabs" class="mb-6" />

      <div v-if="isLoading" class="flex justify-center py-12">
        <UIcon
          name="i-lucide-loader-2"
          class="animate-spin text-3xl text-gray-400"
        />
      </div>

      <AdminPagesContentEditor
        v-else
        :content="pageContent"
        :language="tabs[activeLanguage]"
        @update:content="updatePageContent"
      />
    </div>
  </div>
</template>
