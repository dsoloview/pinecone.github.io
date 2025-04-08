<template>
  <div class="hidden md:flex gap-10 items-center">
    <NuxtLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="header__nav__link"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  { to: "/", text: "Pinecone theater" },
  { to: "/", text: "Immersivity" },
  { to: "/", text: "Team & Cast" },
  { to: "/", text: "About us" },
  { to: "/", text: "Private event" },
  { to: "/", text: "Contact us" },
];
</script>

<style scoped>
@reference '../../assets/scss/main.css';

.header__nav__link {
  @apply text-white cursor-pointer hover:text-brown uppercase transition-colors duration-300;
}
</style>
