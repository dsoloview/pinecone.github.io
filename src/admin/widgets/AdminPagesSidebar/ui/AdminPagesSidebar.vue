<script setup lang="ts">
import type { Page } from "~/generated/prisma";

type Props = {
  pages: Page[];
};
defineProps<Props>();
</script>

<template>
  <nav class="py-4">
    <ul>
      <li v-for="page in pages" :key="page.id" class="mb-1">
        <NuxtLink
          :to="{
            name: 'admin-pages-slug',
            params: {
              slug: page.slug,
            },
          }"
          class="w-full text-left py-2 px-4 transition-colors rounded-md"
        >
          {{ page.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
