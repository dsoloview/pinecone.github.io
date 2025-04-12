<script setup lang="ts">
import CocktailsSlider from "~/widgets/CocktailsSlider/ui/CocktailsSlider.vue";
import H1Title from "~/features/Title/ui/H1Title.vue";

definePageMeta({
  name: "cocktails",
});

const translationKey = "pages.pinecone-bar.subPages.cocktails";
const { t } = useI18n();
</script>

<template>
  <H1Title class="small" tag="h1">{{ t(`${translationKey}.title`) }}</H1Title>
  <CocktailsSlider />
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
