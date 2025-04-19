<script setup lang="ts">
import AdminHeader from "~/admin/widgets/AdminHeader/ui/AdminHeader.vue";

defineI18nRoute(false);
</script>

<template>
  <Body>
    <AdminHeader />
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </Body>
</template>

<style scoped></style>
