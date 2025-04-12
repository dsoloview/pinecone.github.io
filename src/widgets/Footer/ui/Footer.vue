<script setup lang="ts">
import Socials from "~/features/Socials/ui/Socials.vue";
import LinkButton from "~/entities/LinkButton/ui/LinkButton.vue";
import { THEATER_TICKETS_LINK } from "~/shated/data/links";

const { t } = useI18n();
</script>

<template>
  <footer
    class="flex flex-wrap items-center justify-between gap-y-10 py-10 mt-10"
  >
    <div class="flex flex-wrap items-center gap-10">
      <LinkButton to="/">{{ t("buttons.book_table") }}</LinkButton>
      <LinkButton external :to="THEATER_TICKETS_LINK">
        {{ t("buttons.buy_ticket") }}
      </LinkButton>
    </div>
    <Socials />
  </footer>
</template>

<style scoped></style>
