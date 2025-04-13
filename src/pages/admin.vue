<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "authenticated",
  layout: false,
});
</script>
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<style scoped></style>
