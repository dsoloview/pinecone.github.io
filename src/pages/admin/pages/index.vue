<script setup lang="ts">
import { ref } from "vue";
import AdminPagesSidebar from "~/admin/widgets/AdminPagesSidebar/ui/AdminPagesSidebar.vue";
import type { Page } from "~/generated/prisma";

const pages = ref<Page[]>([{ id: 1, name: "Главная", slug: "home" }]);
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-gray-900 text-white border-r border-gray-800">
      <div class="p-4 border-b border-gray-800">
        <h1 class="text-xl font-semibold">Админ-панель</h1>
      </div>
      <AdminPagesSidebar :pages="pages" />
    </aside>
  </div>
</template>
