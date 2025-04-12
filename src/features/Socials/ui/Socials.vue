<template>
  <div class="flex gap-5 justify-center text-white">
    <NuxtLinkLocale
      external
      to="https://www.instagram.com/pineconebar?igsh=OThqbmppcHQ3M2lk"
    >
      <Icon
        class="socialIcon transition-colors duration-200"
        size="24px"
        name="uil:instagram"
      />
    </NuxtLinkLocale>
    <NuxtLinkLocale
      external
      to="https://www.facebook.com/profile.php?id=61561170970112"
    >
      <Icon
        class="socialIcon transition-colors duration-200"
        size="24px"
        name="uil:facebook"
      />
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.socialIcon:hover {
  color: var(--color-brown);
}
</style>
