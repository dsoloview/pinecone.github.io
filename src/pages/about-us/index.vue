<script setup lang="ts">
import TextBlock from "~/entities/TextBlock/TextBlock.vue";
import H1Title from "~/features/Title/ui/H1Title.vue";

definePageMeta({
  name: "about-us",
});

const { t } = useI18n();
</script>

<template>
  <H1Title>{{ t("pages.about-us.title") }}</H1Title>
  <TextBlock language-key="pages.about-us.textBlocks" />
</template>

<style scoped></style>
