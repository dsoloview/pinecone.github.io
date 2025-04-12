<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import LinkButton from "~/entities/LinkButton/ui/LinkButton.vue";
import QuotesPanel from "~/widgets/QuotesPanel/ui/QuotesPanel.vue";

definePageMeta({
  name: "pinecone-bar",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-20">
    <PageTitle tag="h1">{{ t("pages.pinecone-bar.title") }}</PageTitle>
    <PageTitle tag="h3">{{ t("pages.pinecone-bar.subTitle") }}</PageTitle>
  </div>
  <div class="flex flex-col gap-20">
    <!--    <div class="flex justify-center">-->
    <!--      <LinkButton class="text-lg xl:text-lg" :to="THEATER_TICKETS_LINK">{{-->
    <!--        t("buttons.buy_ticket")-->
    <!--      }}</LinkButton>-->
    <!--    </div>-->
    <div class="flex flex-wrap items-center justify-center gap-20">
      <LinkButton class="text-lg xl:text-lg" to="/pinecone-bar/cocktails">{{
        t("buttons.cocktails")
      }}</LinkButton>
      <!--      <LinkButton class="text-lg xl:text-lg" to="/">{{-->
      <!--        t("buttons.wines")-->
      <!--      }}</LinkButton>-->
    </div>
  </div>
  <QuotesPanel translation-key="pages.pinecone-bar.quotes" />
  <div class="bottomText text-center text-3xl">
    {{ t("pages.pinecone-bar.bottomText") }}
  </div>
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.bottomText {
  margin: 0 auto;
  color: rgb(255, 253, 238);
  max-width: 600px;
  font-family: Forum, sans-serif;
}
</style>
