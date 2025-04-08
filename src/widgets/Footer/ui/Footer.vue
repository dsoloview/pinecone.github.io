<script setup lang="ts">

import Socials from "~/features/Socials/ui/Socials.vue";
import FooterLink from "~/entities/FooterLink/ui/FooterLink.vue";
</script>

<template>
<footer class="flex items-center justify-between py-10">
  <div class="flex items-center gap-30">
    <FooterLink to="/">Book a table at out pineconebar</FooterLink>
    <FooterLink external to="https://tickets.efinity.rs/event_info/lucidity_triptych_31620">Buy a ticket</FooterLink>
  </div>
  <Socials />
</footer>
</template>

<style scoped>
</style>