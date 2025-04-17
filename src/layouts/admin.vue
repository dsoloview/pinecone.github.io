<script setup lang="ts">
import AdminHeader from "~/admin/widgets/AdminHeader/ui/AdminHeader.vue";
</script>

<template>
  <Body>
    <AdminHeader />
    <UContainer>
      <slot />
    </UContainer>
  </Body>
</template>

<style scoped></style>
