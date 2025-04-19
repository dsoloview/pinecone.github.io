<script setup lang="ts">
type Props = {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
const props = defineProps<Props>();
</script>

<template>
  <component :is="props.tag" class="pageTitle text-white"><slot /></component>
</template>

<style scoped>
@reference '@/assets/scss/main.css';

.pageTitle {
  text-align: center;
  margin: 0 auto;
  font-family: var(--font-styled), sans-serif;
}
h1 {
  @apply text-7xl md:text-9xl;
}

h2 {
  @apply text-4xl md:text-6xl;
}

h3 {
  @apply text-xl md:text-2xl;
}
</style>
