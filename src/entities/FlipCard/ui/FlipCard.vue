<script setup lang="ts">
type Props = {
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
    class="group w-64 h-[450px] perspective"
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
      <!-- Front side -->
      <div
        class="card-front absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden"
        :class="{ 'hover-effect': canFlip }"
      >
        <img
          :src="frontImageSrc"
          alt="Front"
          class="object-cover w-full h-full absolute z-0"
        />
        <div class="relative z-10 p-4 w-full h-full">
          <slot name="frontText" />
        </div>
      </div>

      <!-- Back side -->
      <div
        class="absolute w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
      >
        <img
          :src="backImageSrc"
          alt="Back"
          class="object-cover w-full h-full absolute z-0 opacity-40"
        />
        <div class="relative z-10 p-4 w-full h-full">
          <slot name="backText" />
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
  transition: transform 0.5s ease;
}

.no-animation {
  transition: none;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-default {
  cursor: default;
}

.group:hover .card-front.hover-effect {
  transform: rotateY(15deg);
}

.card-front,
.card-back {
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}
</style>
