<script setup lang="ts">

</script>

<template>
  <nav class="flex gap-10 items-center">
    <NuxtLink class="header__nav__link">Pinecone theater</NuxtLink>
    <NuxtLink class="header__nav__link">Immersivity</NuxtLink>
    <NuxtLink class="header__nav__link">Team & Cast</NuxtLink>
    <NuxtLink class="header__nav__link">About us</NuxtLink>
    <NuxtLink class="header__nav__link">Private event</NuxtLink>
    <NuxtLink class="header__nav__link">Contact us</NuxtLink>
  </nav>
</template>

<style scoped>
@reference "../../../assets/scss/main.css";

.header__nav__link {
  @apply text-white cursor-pointer hover:text-brown uppercase transition-colors duration-200 xl:text-lg text-sm;
}
</style>