<script setup lang="ts">
const route = useRoute();
const { t, te } = useI18n();

const pageName = computed(() => {
  return route.meta.name;
});
</script>

<template>
  <template>
    <Meta
      v-if="te(`seo.${pageName}.openGraph.title`)"
      property="og:title"
      :content="t(`seo.${pageName}.openGraph.title`)"
    />
    <Meta
      v-if="te(`seo.${pageName}.openGraph.description`)"
      property="og:description"
      :content="t(`seo.${pageName}.openGraph.description`)"
    />
    <Meta property="og:type" content="website" />
  </template>
</template>

<style scoped></style>
