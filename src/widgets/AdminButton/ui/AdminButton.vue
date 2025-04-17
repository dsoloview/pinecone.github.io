<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>

<template>
  <NuxtLink v-if="loggedIn" to="/admin" class="adminButton">
    <UButton icon="i-lucide-rocket" color="neutral" variant="outline">
      Admin Panel
    </UButton>
  </NuxtLink>
</template>

<style scoped>
.adminButton {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 20;
}
</style>
