<script setup lang="ts">
import H1Title from "~/features/Title/ui/H1Title.vue";

definePageMeta({
  name: "private-event",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-20">
    <H1Title class="small" tag="h1">{{
      t("pages.private-event.title")
    }}</H1Title>
  </div>
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
