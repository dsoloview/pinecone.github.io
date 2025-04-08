<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import type {ITextBlock} from "~/entities/TextBlock/types/textBlock.types";
type Props = {
  blocks: ITextBlock[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-15">
    <div v-for="(block, index) in props.blocks" :key="index" class="flex flex-col items-start gap-3">
      <PageTitle v-if="block.title" class="blockTitle" :tag="'h3'">{{ block.title }}</PageTitle>
      <p v-for="(paragraph, i) in block.paragraphs" :key="i" class="text-lg">
        {{ paragraph }}
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