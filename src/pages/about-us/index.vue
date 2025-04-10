<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";

definePageMeta({
  name: "about-us",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-30">
    <PageTitle tag="h1">{{ t("pages.about-us.title") }}</PageTitle>
  </div>
  <TextBlock language-key="pages.about-us.textBlocks" />
</template>

<style scoped></style>
