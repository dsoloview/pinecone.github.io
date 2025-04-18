<script setup lang="ts">
import { definePageMeta } from "#imports";
import { en } from "@nuxt/ui/locale";
import AdminConfirm from "~/admin/entities/AdminConfirm/ui/AdminConfirm.vue";

defineI18nRoute(false);

definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});
</script>
<template>
  <UApp :locale="en">
    <AdminConfirm />
    <NuxtPage />
  </UApp>
</template>

<style scoped></style>
