<script setup lang="ts">
import CocktailsSlide from "~/widgets/CocktailsSlider/ui/CocktailsSlide.vue";

type Slide = {
  title: string;
  text: string;
  image: string;
};
const containerRef = ref(null);
const swiper = useSwiper(containerRef);

const { tm, rt, t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-10 text-white">
    <client-only>
      <swiper-container
        ref="containerRef"
        :autoplay="{ delay: 5000, disableOnInteraction: true }"
        loop
      >
        <swiper-slide
          v-for="(slide, idx) in tm('sliders.cocktails') as Slide[]"
          :key="idx"
        >
          <CocktailsSlide
            :title="rt(slide.title)"
            :text="rt(slide.text)"
            :image="rt(slide.image)"
          />
        </swiper-slide>
      </swiper-container>
    </client-only>

    <div class="flex justify-center items-center gap-3">
      <button class="cocktailsSlider__button" @click="swiper.prev()">
        {{ t("buttons.prev") }}
      </button>
      /
      <button class="cocktailsSlider__button" @click="swiper.next()">
        {{ t("buttons.next") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference '@/assets/scss/main.css';

.cocktailsSlider__button {
  @apply text-white cursor-pointer hover:text-brown uppercase transition-colors duration-300;
}
</style>
