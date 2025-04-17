<script setup lang="ts">
import { useConfirm } from "~/admin/entities/AdminConfirm/hooks/useConfirm";

const { isOpen, params } = useConfirm();

function close() {
  isOpen.value = false;
}

function confirm() {
  params.value.action();
  close();
}
</script>

<template>
  <UModal v-model:open="isOpen" class="modal" :title="params.title">
    <template #body>
      {{ params.message }}
    </template>
    <template #footer>
      <UButton color="neutral" variant="outline" @click="close">Cancel</UButton>
      <UButton color="error" @click="confirm">{{ params.label }}</UButton>
    </template>
  </UModal>
</template>

<style scoped></style>
