<script setup lang="ts">
import Socials from "~/features/Socials/ui/Socials.vue";
import FooterLink from "~/entities/FooterLink/ui/FooterLink.vue";

const { t } = useI18n();
</script>

<template>
  <footer
    class="flex flex-wrap items-center justify-between gap-y-10 py-10 mt-10"
  >
    <div class="flex flex-wrap items-center gap-10">
      <FooterLink to="/">{{ t("buttons.book_table") }}</FooterLink>
      <FooterLink
        external
        to="https://tickets.efinity.rs/event_info/lucidity_triptych_31620"
        >{{ t("buttons.buy_ticket") }}</FooterLink
      >
    </div>
    <Socials />
  </footer>
</template>

<style scoped></style>
