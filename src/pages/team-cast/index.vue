<script setup lang="ts">
import FlipCard from "~/entities/FlipCard/ui/FlipCard.vue";
import FlipCardContent from "~/entities/FlipCard/ui/FlipCardContent.vue";

definePageMeta({
  name: "team-cast",
});

const { t } = useI18n();
</script>

<template>
  <div class="cards">
    <FlipCard
      back-translation-name="andrea"
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    />
    <FlipCard
      back-translation-name="nevena_matic"
      front-image="/images/cards/lu.jpg"
      back-image="/images/people/nevena_matic.jpg"
    />
    <FlipCard
      back-translation-name="kristina"
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/kristina.jpg"
    />
    <FlipCard
      back-translation-name="vedran"
      front-image="/images/cards/antipa.jpg"
      back-image="/images/people/vedran.jpg"
    />
    <FlipCard
      back-translation-name="maksim"
      front-image="/images/cards/makareus.jpg"
      back-image="/images/people/maksim.jpg"
    />
    <FlipCard
      back-translation-name="aleksandar_kecman"
      front-image="/images/cards/wilhelm.jpg"
      back-image="/images/people/aleksandar_kecman.jpg"
    />
    <FlipCard
      back-translation-name="milica_majkic"
      front-image="/images/cards/electra.jpg"
      back-image="/images/people/milica_majkic.jpg"
    />
    <FlipCard
      back-translation-name="yulia_graut"
      front-image="/images/cards/electra.jpg"
      back-image="/images/people/yulia_graut.jpg"
    />
    <FlipCard
      back-translation-name="nevena_dokovic"
      front-image="/images/cards/canaca.jpg"
      back-image="/images/people/nevena_dokovic.jpg"
    />
    <FlipCard
      back-translation-name="uros_petronijevic"
      front-image="/images/cards/laius.jpg"
      back-image="/images/people/uros_petronijevic.jpg"
    />
    <FlipCard
      back-translation-name="nikola_pavlovic"
      front-image="/images/cards/justice.jpg"
      back-image="/images/people/nikola_pavlovic.jpg"
    />
    <FlipCard :can-flip="false" front-image="/images/people/jovana.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">{{
            t("cards.jovana_radovanovic.name")
          }}</span>
          <span>{{ t("cards.jovana_radovanovic.role") }}</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/stefan.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">{{ t("cards.stefan_zekic.name") }}</span>
          <span>{{ t("cards.stefan_zekic.role") }}</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/julija.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">{{ t("cards.julija_mihejeva.name") }}</span>
          <span>{{ t("cards.julija_mihejeva.role") }}</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/sofija.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">{{ t("cards.sofija_sibinovic.name") }}</span>
          <span>{{ t("cards.sofija_sibinovic.role") }}</span>
        </div>
      </template>
    </FlipCard>
    <div />
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  max-width: 1100px;
  margin-top: 50px;
  margin-inline: auto;
  padding: 20px;
  place-items: center;
}
</style>
