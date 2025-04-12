<script setup lang="ts">
import FlipCard from "~/entities/FlipCard/ui/FlipCard.vue";

type Props = {
  title: string;
  text: string;
  image: string;
};

defineProps<Props>();
</script>

<template>
  <div
    class="cocktailsSlide grid md:grid-flow-col md:auto-cols-auto justify-center items-center gap-8"
  >
    <div
      class="flex flex-col gap-6 md:gap-10 self-center justify-self-center order-2 md:order-1"
    >
      <div class="text-2xl md:text-5xl cocktailsSlide__title uppercase">
        {{ title }}
      </div>
      <div class="cocktailsSlide__text max-w-[600px] text-lg">{{ text }}</div>
    </div>
    <div class="self-center justify-self-center order-1 md:order-2">
      <FlipCard
        class="h-[300px] md:h-[450px]"
        :front-image="image"
        :can-flip="false"
      />
    </div>
  </div>
</template>

<style scoped>
.cocktailsSlide {
  margin: 0;
  padding: 0;
}

.cocktailsSlide__title {
  font-family: var(--font-styled), sans-serif;
}

.cocktailsSlide__text {
  font-family: var(--font-styled), sans-serif;
  color: rgba(255, 255, 255, 0.7);
}
</style>
