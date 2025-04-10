<script setup lang="ts">
import DesktopMenu from "~/features/Navigation/ui/DesktopMenu.vue";
import MobileMenu from "~/features/Navigation/ui/MobileMenu.vue";
</script>

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
