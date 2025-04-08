<script setup lang="ts">
type Props = {
  frontImage: string
  backImage: string
  backText: string
}
defineProps<Props>()

const flipped = ref(false)
</script>

<template>
  <div
      class="group w-64 h-96 perspective cursor-pointer"
      @click="flipped = !flipped"
  >
    <div
        class="relative w-full h-full transition-transform duration-500 transform-style preserve-3d"
        :class="{ 'rotate-y-180': flipped }"
    >
      <div
          class="card-front absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 origin-left"
      >
        <img
            :src="`/cards/${frontImage}`"
            alt="Front"
            class="object-cover w-full h-full"
        />
      </div>

      <div
          class="absolute w-full h-full backface-hidden rotate-y-180 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
      >
        <img
            :src="`/cards/${backImage}`"
            alt="Back"
            class="object-cover w-full h-full absolute z-0 opacity-40"
        />
        <div class="relative z-10 p-4 text-center">
          <p class="text-lg font-semibold">{{ backText }}</p>
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

.origin-left {
  transform-origin: left center;
}

.group:hover .card-front {
  transform: rotateY(15deg);
  transition: transform 0.3s ease;
}
</style>
