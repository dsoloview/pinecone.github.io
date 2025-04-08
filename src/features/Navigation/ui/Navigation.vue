<template>
  <nav class="relative">
    <div class="hidden md:flex gap-10 items-center">
      <DesktopMenu />
    </div>
    <div class="md:hidden">
      <MobileMenu />
    </div>

  </nav>
</template>

<script setup lang="ts">
import DesktopMenu from "~/entities/Menu/DesktopMenu.vue";
import MobileMenu from "~/entities/Menu/MobileMenu.vue";
</script>
