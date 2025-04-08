<script setup lang="ts">

import Header from "~/widgets/Header/ui/Header.vue";
import MouseLight from "~/widgets/MouseLight/ui/MouseLight.vue";
import Footer from "~/widgets/Footer/ui/Footer.vue";
</script>

<template>
  <div class="min-h-screen w-[100%] bg-black relative overflow-hidden py-12">
    <client-only>
      <MouseLight />
    </client-only>
    <div class="container relative z-10">
      <Header />
      <main>
        <slot/>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>