<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import CocktailsSlider from "~/widgets/CocktailsSlider/ui/CocktailsSlider.vue";

definePageMeta({
  name: "cocktails",
});

const translationKey = "pages.pinecone-bar.subPages.cocktails";
const { t } = useI18n();
</script>

<template>
  <div class="my-30">
    <PageTitle class="small" tag="h1">{{
      t(`${translationKey}.title`)
    }}</PageTitle>
  </div>
  <CocktailsSlider />
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
