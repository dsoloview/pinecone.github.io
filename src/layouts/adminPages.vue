<script setup lang="ts">
import { ref } from "vue";
import type { Page } from "~/generated/prisma";
import AdminPagesSidebar from "~/admin/widgets/AdminPagesSidebar/ui/AdminPagesSidebar.vue";

defineI18nRoute(false);

const pages = ref<Page[]>([{ id: 1, name: "Главная", slug: "home" }]);
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex min-h-screen">
      <aside
        class="w-64 bg-white border-r border-gray-200 shadow-sm flex-shrink-0"
      >
        <div class="p-4 border-b border-gray-200">
          <h1 class="text-xl font-semibold text-gray-800">Страницы</h1>
        </div>
        <AdminPagesSidebar :pages="pages" />
      </aside>

      <!-- Основной контент -->
      <main class="flex-1 overflow-auto bg-white">
        <slot />
      </main>
    </div>
  </NuxtLayout>
</template>
