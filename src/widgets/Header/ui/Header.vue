<script setup lang="ts">
import Navigation from "~/features/Navigation/ui/Navigation.vue";
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <NuxtLinkLocale to="/">
        <img alt="logo" class="w-full" src="/images/logo.png" />
      </NuxtLinkLocale>
    </div>
    <Navigation />
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
