<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Используйте i18n для переключения языков
const { locales, setLocale } = useI18n();

// Управление состоянием выпадающего меню
const isDropdownOpen = ref(false);

// Закрытие меню по клику вне его области
const closeDropdown = (event: Event) => {
  const dropdown = document.getElementById("language-dropdown");
  const target = event.target as Node;
  if (dropdown && !dropdown.contains(target)) {
    isDropdownOpen.value = false;
  }
};

// Навешиваем слушатели событий для клика вне
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

// Логика переключения
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLocale = (localeCode: string) => {
  setLocale(localeCode as "en" | "sr");
  isDropdownOpen.value = false;
};
</script>

<template>
  <div id="language-dropdown" class="relative">
    <!-- Кнопка с прозрачным фоном и иконкой -->
    <button
      class="flex items-center justify-center w-10 h-10 text-white rounded hover:bg-black/10 transition duration-300"
      @click="toggleDropdown"
    >
      <Icon name="uil:globe" class="w-6 h-6" aria-label="Language Switcher" />
    </button>

    <!-- Выпадающее меню -->
    <transition name="fade">
      <ul
        v-if="isDropdownOpen"
        class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-44 backdrop-blur-lg bg-black/50 rounded-xl shadow-lg text-white text-sm text-center overflow-hidden z-20"
      >
        <li
          v-for="locale in locales"
          :key="locale.code"
          class="px-4 py-3 hover:bg-white/10 cursor-pointer transition duration-300"
          @click="selectLocale(locale.code)"
        >
          {{ locale.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
/* Анимация появления выпадающего меню */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
