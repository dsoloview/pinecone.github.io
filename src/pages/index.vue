<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";

definePageMeta({
  name: "home",
});

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center gap-20 my-20">
    <PageTitle tag="h1">{{ t("pages.home.title") }}</PageTitle>
    <PageTitle tag="h2">
      <span class="uppercase">{{ t("pages.home.subTitle.bold") }}</span>
      {{ t("pages.home.subTitle.main") }}
    </PageTitle>
  </div>
  <TextBlock language-key="pages.home.textBlocks" />
</template>

<style scoped>
.blockTitle {
  text-align: left;
  font-weight: bold;
  font-family: Inter, sans-serif;
  margin: 0;
}
</style>
