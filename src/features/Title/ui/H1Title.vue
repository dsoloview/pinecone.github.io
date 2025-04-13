<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";

type Props = {
  small?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div class="my-20">
    <PageTitle :class="{ small }" tag="h1"><slot /></PageTitle>
  </div>
</template>

<style scoped>
@reference '@/assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
