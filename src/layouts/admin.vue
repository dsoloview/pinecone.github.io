<script setup lang="ts">
import AdminHeader from "~/admin/widgets/AdminHeader/ui/AdminHeader.vue";
import AdminConfirm from "~/admin/entities/AdminConfirm/ui/AdminConfirm.vue";

defineI18nRoute(false);
</script>

<template>
  <Body>
    <AdminHeader />
    <AdminConfirm />
    <UContainer>
      <slot />
    </UContainer>
  </Body>
</template>

<style scoped></style>
