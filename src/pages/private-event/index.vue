<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";

definePageMeta({
  name: "private-event",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-30">
    <PageTitle class="small" tag="h1">{{
      t("pages.private-event.title")
    }}</PageTitle>
  </div>
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
