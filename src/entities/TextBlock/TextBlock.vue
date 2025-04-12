<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import type { ITextBlock } from "~/entities/TextBlock/types/textBlock.types";
type Props = {
  languageKey: string;
};

const { tm, rt } = useI18n();

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-10 text-white">
    <div
      v-for="(block, index) in tm(languageKey) as ITextBlock[]"
      :key="index"
      class="flex flex-col items-start gap-3"
    >
      <PageTitle v-if="block.title" class="blockTitle" tag="h3">{{
        rt(block.title)
      }}</PageTitle>
      <p v-for="(paragraph, i) in block.paragraphs" :key="i" class="text-lg">
        {{ rt(paragraph) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.blockTitle {
  text-align: left;
  font-weight: bold;
  font-family: Inter, sans-serif;
  margin: 0;
}
</style>
