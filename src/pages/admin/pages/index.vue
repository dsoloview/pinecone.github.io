<script setup lang="ts">
import { ref } from "vue";
import AdminPagesSidebar from "~/admin/widgets/AdminPagesSidebar/ui/AdminPagesSidebar.vue";
import type { Page } from "~/generated/prisma";
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "admin-pages",
});
</script>

<template>
  <div
    class="flex-1 bg-gray-100 flex flex-col items-center justify-center h-screen"
  >
    <UCard class="max-w-lg w-full text-center p-8">
      <div class="flex flex-col items-center">
        <UIcon name="i-lucide-file-text" class="text-7xl text-gray-300 mb-6" />
        <h2 class="text-2xl font-medium text-gray-800 mb-3">
          Выберите страницу
        </h2>
        <p class="text-gray-600 mb-6">
          Пожалуйста, выберите страницу из списка слева для редактирования её
          содержимого.
        </p>
        <UButton
          to="/admin"
          color="primary"
          variant="subtle"
          icon="i-lucide-arrow-left"
          size="lg"
        >
          Вернуться в админ-панель
        </UButton>
      </div>
    </UCard>
  </div>
</template>
