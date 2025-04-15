<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import {
  ADDRESS,
  EMAIL,
  OLD_STREET,
  PHONE,
  PHONE_TEXT,
} from "~/shared/data/contacts";
import Socials from "~/features/Socials/ui/Socials.vue";
import ContactForm from "~/features/ContactForm/ui/ContactForm.vue";

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

      <NuxtLinkLocale
        external
        target="_blank"
        class="contacts__address flex flex-col items-center gap-3"
        to="https://maps.app.goo.gl/juWkNTAKDCXVwuR16"
      >
        <span class="contacts__address__text">{{ ADDRESS }}</span>
        <span class="contacts__address__text">({{ OLD_STREET }})</span>
      </NuxtLinkLocale>

      <div class="divider" />
      <div class="contacts__container lg:flex items-start justify-between w-full">
        <div class="lg:w-1/2 mb-4">
          <ContactForm/>
        </div>
        <div class="lg:w-1/2">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.322456140337!2d20.469168277419357!3d44.814995071070726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7b252e23a575%3A0x30a8bb16f98563a5!2sPinecone%20Bar%20%26%20Theater!5e0!3m2!1ssr!2srs!4v1744543877577!5m2!1ssr!2srs"
              width="100%"
              height="450"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@reference '@/assets/scss/main.css';

.contacts {
  //max-width: 500px;
}

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

.contacts__address__text {
  @apply cursor-pointer transition-colors duration-300;
}
.contacts__address {
  @apply cursor-pointer hover:text-brown uppercase transition-colors duration-300;

  &:hover .contacts__address__text {
    @apply text-brown;
  }
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
