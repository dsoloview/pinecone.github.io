<template>
  <div class="hidden md:flex gap-10 items-center">
    <NuxtLink
      v-for="item in menuLinks"
      :key="item.to"
      :to="item.to"
      class="header__nav__link"
    >
      {{ t(`navigation.${item.translationKey}`) }}
    </NuxtLink>
    <LanguageSwitcher />
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from "~/entities/LanguageSwitcher/ui/LanguageSwitcher.vue";
import { menuLinks } from "~/features/Navigation/data/data";

const { t } = useI18n();
</script>

<style scoped>
@reference '../../../assets/scss/main.css';

.header__nav__link {
  @apply text-white cursor-pointer hover:text-brown uppercase transition-colors duration-300;
}
</style>
