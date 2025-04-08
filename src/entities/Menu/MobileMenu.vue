<template>
  <div>
    <button
        class="text-white hover:text-brown transition-colors duration-200 focus:outline-none flex items-center gap-2"
        @click="toggleMenu"
    >
      <svg
          v-if="!isOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span class="text-sm uppercase tracking-wide">
        {{ isOpen ? 'Close menu' : 'Open menu' }}
      </span>
    </button>

    <div
        v-show="true"
        :class="{
        'opacity-100 pointer-events-auto': isOpen,
        'opacity-0 pointer-events-none': !isOpen
      }"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center transition-opacity duration-300 ease-in-out"
        @click.self="closeMenu"
    >

      <button
          class="absolute top-4 right-4 text-white hover:text-brown transition-colors duration-300 ease-in-out focus:outline-none"
          @click="closeMenu"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-8 h-8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="header__nav__link text-center text-lg transition duration-500 ease-in-out"
          @click="closeMenu"
      >
        {{ item.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

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