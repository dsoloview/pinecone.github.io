<script setup lang="ts">
import Header from "~/widgets/Header/ui/Header.vue";
import MouseLight from "~/widgets/MouseLight/ui/MouseLight.vue";
import Footer from "~/widgets/Footer/ui/Footer.vue";

const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();
const title = computed(() => {
  const pageName: string = route.meta.name ?? "TBD";
  return t(`seo.title.${pageName}`, t("seo.title.default"));
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.hid">
        <Link
          :id="link.hid"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.hid">
        <Meta
          :id="meta.hid"
          :property="meta.property"
          :content="meta.content"
        />
      </template>
    </Head>
    <Body>
      <div
        class="min-h-screen w-[100%] bg-black relative overflow-hidden py-12"
      >
        <client-only>
          <MouseLight />
        </client-only>
        <div class="container relative z-10">
          <Header />
          <main>
            <slot />
          </main>
          <Footer />
        </div>
      </div>
    </Body>
  </Html>
</template>

<style lang="scss" scoped></style>
