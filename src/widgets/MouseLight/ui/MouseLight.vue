<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSmoothMouse } from "~/widgets/MouseLight/hooks/useSmoothMouse";

const isMobile = ref(window.innerWidth <= 768);

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});


const { smoothX, smoothY, size, opacity } = useSmoothMouse(0.1, isMobile.value)
</script>

<template>
    <div
        class="mouseLight absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl z-10"
        :style="{
      opacity,
      left: `${smoothX}px`,
      top: `${smoothY}px`,
      width: `${size}px`,
      height: `${size}px`,
      willChange: 'transform, opacity'
    }"
    />
</template>

<style scoped lang="scss">
.mouseLight {
  transform: translate3d(0, 0, 0);
  border-radius: 50%;
  background: radial-gradient(
          circle,
          rgba(var(--color-brown-plain), 0.8) 0%,
          rgba(var(--color-brown-plain), 0.3) 60%,
          rgba(var(--color-brown-plain), 0) 100%
  );
}
</style>