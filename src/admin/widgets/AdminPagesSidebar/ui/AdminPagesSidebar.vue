<script setup lang="ts">
import type { Page } from "~/generated/prisma";
import type { NavigationMenuItem } from "@nuxt/ui";

type Props = {
  pages: Page[];
};
const props = defineProps<Props>();

const items = computed<NavigationMenuItem[][]>(() => {
  const result: NavigationMenuItem[][] = [[]];
  props.pages.map((page) => {
    result[0].push({
      label: page.name,
      to: `/admin/pages/${page.slug}`,
    });
  });

  return result;
});
</script>

<template>
  <nav class="py-4">
    <UNavigationMenu orientation="vertical" :items="items" />
  </nav>
</template>
