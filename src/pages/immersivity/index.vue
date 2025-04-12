<script setup lang="ts">
import TextBlock from "~/entities/TextBlock/TextBlock.vue";
import H1Title from "~/features/Title/ui/H1Title.vue";

definePageMeta({
  name: "immersivity",
});

const { t } = useI18n();
</script>

<template>
  <H1Title small tag="h1">{{ t("pages.immersivity.title") }}</H1Title>
  <TextBlock language-key="pages.immersivity.textBlocks" />
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
