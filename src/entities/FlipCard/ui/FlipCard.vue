<script setup lang="ts">
import FlipCardContent from "~/entities/FlipCard/ui/FlipCardContent.vue";

type Props = {
  backTranslationName?: string;
  frontTranslationName?: string;
  canFlip?: boolean;
  frontImage: string;
  backImage?: string;
};
const { canFlip = true, frontImage, backImage } = defineProps<Props>();
const config = useRuntimeConfig();

const frontImageSrc = computed(() =>
  frontImage?.startsWith("http")
    ? frontImage
    : config.app.baseURL + frontImage.replace(/^\/+/, ""),
);

const backImageSrc = computed(() =>
  backImage?.startsWith("http")
    ? backImage
    : config.app.baseURL + backImage?.replace(/^\/+/, ""),
);

const flipped = ref(false);

function handleFlip() {
  if (canFlip) {
    flipped.value = !flipped.value;
  }
}
</script>

<template>
  <div
    class="group w-64 h-[450px] perspective text-sm"
    :class="{ 'cursor-pointer': canFlip, 'cursor-default': !canFlip }"
    @click="handleFlip"
  >
    <div
      class="relative w-full h-full transform-style preserve-3d"
      :class="{
        'rotate-y-180 transition-transform duration-500': flipped && canFlip,
        'transition-transform duration-500': canFlip,
        'no-animation': !canFlip,
      }"
    >
      <div
        class="card-front absolute w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden"
        :class="{ 'hover-effect': canFlip }"
      >
        <img
          :src="frontImageSrc"
          alt="Front"
          class="object-cover w-full h-full absolute z-0"
        />
        <div class="relative z-10 p-4 w-full h-full">
          <FlipCardContent
            v-if="frontTranslationName"
            :translation-name="frontTranslationName"
          />
          <slot v-else name="frontText" />
        </div>
      </div>

      <div
        class="absolute w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
      >
        <img
          :src="backImageSrc"
          alt="Back"
          class="object-cover w-full h-full absolute z-0 opacity-40"
        />
        <div class="relative z-10 p-4 w-full h-full">
          <FlipCardContent
            v-if="backTranslationName"
            :translation-name="backTranslationName"
          />
          <slot v-else name="backText" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.transform-style {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.transition-transform {
  transition: transform 0.4s cubic-bezier(0.42, 0, 0.58, 1);
}

.no-animation {
  transition: none;
}

@media (hover: hover) and (pointer: fine) {
  .group:hover .card-front.hover-effect {
    transform: rotateY(15deg);
    transition: transform 0.2s ease-in-out;
  }

  .group .card-front.hover-effect {
    transform: none;
    transition: transform 0.4s ease-in-out;
  }
}

@media (hover: none) and (pointer: coarse) {
  .card-front.hover-effect {
    animation: tilt-animation 2.5s ease-in-out infinite;
  }
}

@keyframes tilt-animation {
  0%,
  100% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(12deg);
  }
}

.card-front,
.card-back {
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}
</style>
