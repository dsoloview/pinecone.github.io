<script setup lang="ts">

import {useSmoothMouse} from "~/widgets/MouseLight/hooks/useSmoothMouse";

const { smoothX, smoothY, size, opacity } = useSmoothMouse()
</script>

<template>
  <div
      class="mouseLight absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl z-10"
      :style="{
      opacity,
      left: `${smoothX}px`,
      top: `${smoothY}px`,
      width: `${size}px`,
      height: `${size}px`
    }"
  />
</template>

<style scoped lang="scss">
.mouseLight {
  background: radial-gradient(
          circle,
          rgba(var(--color-brown-plain), 0.8) 0%,
          rgba(var(--color-brown-plain), 0.3) 60%,
          rgba(var(--color-brown-plain), 0) 100%
  );
}
</style>