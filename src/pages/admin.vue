<script setup lang="ts">
import { definePageMeta } from "#imports";
import { en } from "@nuxt/ui/locale";

defineI18nRoute(false);

definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});
</script>
<template>
  <UApp :locale="en">
    <NuxtPage />
  </UApp>
</template>

<style scoped></style>
