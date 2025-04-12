<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import {
  ADDRESS,
  EMAIL,
  OLD_STREET,
  PHONE,
  PHONE_TEXT,
} from "~/shated/data/contacts";
import Socials from "~/features/Socials/ui/Socials.vue";

definePageMeta({
  name: "contact-us",
});

const { t } = useI18n();
</script>

<template>
  <div class="my-20">
    <PageTitle class="small" tag="h1">{{
      t("pages.contact-us.title")
    }}</PageTitle>
    <div class="contacts flex flex-col items-center gap-10 my-10 mx-auto">
      <div class="contacts__links flex flex-col items-center gap-3">
        <a class="contacts__link" :href="`tel:${PHONE}`">{{ PHONE_TEXT }}</a>
        <a class="contacts__link" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
        <Socials />
      </div>

      <div class="divider" />

      <div class="contacts__address flex flex-col items-center gap-3">
        <span class="contacts__address__text">{{ ADDRESS }}</span>
        <span class="contacts__address__text">({{ OLD_STREET }})</span>
      </div>

      <div class="divider" />
      <LMap
        class="contacts__map"
        :style="{ height: '350px', zIndex: 0 }"
        :zoom="30"
        :center="[44.814995, 20.471743]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[44.814995, 20.471743]" />
      </LMap>
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/scss/main.css';

/* Parent container */
.contacts {
  max-width: 500px;
}

/* Стили для текста */
.contacts__link,
.contacts__address__text {
  @apply text-lg;
  color: rgb(214, 212, 200);
  text-transform: uppercase;
  text-align: center;
}

.contacts__link {
  @apply cursor-pointer hover:text-brown uppercase transition-colors duration-300;
}

.divider {
  width: 200px;
  height: 6px;
  background: linear-gradient(
    to right,
    rgba(99, 69, 52, 0) 0%,
    var(--color-brown) 50%,
    rgba(99, 69, 52, 0) 100%
  );
  transition: width 0.5s ease;
  border-radius: 4px;
}

.contacts:hover .divider {
  width: 400px;
}

.contacts__map span {
  color: black;
}

.small {
  @apply text-5xl md:text-9xl;
}
</style>
