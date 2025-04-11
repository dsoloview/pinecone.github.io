<script setup lang="ts">
type Props = {
  translationName: string;
};
const props = defineProps<Props>();
const { t, te } = useI18n();

const hasQuote = computed(() => te(`cards.${props.translationName}.quote`));
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-5">
      <span class="font-bold">{{ t(`cards.${translationName}.name`) }}</span>
      <span>{{ t(`cards.${translationName}.text`) }}</span>
    </div>

    <span v-if="hasQuote" class="italic">{{
      t(`cards.${translationName}.quote`)
    }}</span>
  </div>
</template>

<style scoped></style>
