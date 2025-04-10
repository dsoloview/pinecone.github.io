<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";

definePageMeta({
  name: "immersivity",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-30">
    <PageTitle class="small" tag="h1">{{
      t("pages.immersivity.title")
    }}</PageTitle>
  </div>
  <TextBlock language-key="pages.immersivity.textBlocks" />
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
