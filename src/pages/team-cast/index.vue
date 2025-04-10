<script setup lang="ts">
import FlipCard from "~/entities/FlipCard/ui/FlipCard.vue";

definePageMeta({
  name: "team-cast",
});
</script>

<template>
  <div class="cards">
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard
      front-image="/images/cards/herodias.jpg"
      back-image="/images/people/andrea.jpg"
    >
      <template #backText> Andrea </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/jovana.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">Jovana Radovanović</span>
          <span>Project creator/ Producer</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/stefan.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">Stefan Zekić</span>
          <span>Music Director</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/julija.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">Julija Mihejeva</span>
          <span>Visual identity/costume</span>
        </div>
      </template>
    </FlipCard>
    <FlipCard :can-flip="false" front-image="/images/people/sofija.jpg">
      <template #frontText>
        <div class="flex h-full w-full justify-end flex-col">
          <span class="font-bold">Sofija Sibinović</span>
          <span>Harp</span>
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
