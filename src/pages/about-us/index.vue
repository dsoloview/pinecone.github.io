<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import type {ITextBlock} from "~/entities/TextBlock/types/textBlock.types";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";

const textBlocks: ITextBlock[] = [
  {
    paragraphs: [
        "Welcome to the enigmatic world of Pinecone Bar, nestled discreetly in the vibrant neighbourhood of Old City in Belgrade at the address Dalmatinska 5 (now Vladete Jerotića 5), Pinecone Bar, housed in an early 20th-century building, stands as a tribute to the rich history, lovingly restored to its former glory.  Here, amidst the vibrant city streets, mystery and splendour converge to create an unforgettable experience. Our first bar in Belgrade pays homage to the iconic past of its surroundings while embracing the dynamic evolution of the local artistic scene.",
        "Step into an era of opulence and intrigue, where whispers of secret meetings and agendas linger. Our bar exudes an aura of old-world charm, reminiscent of ancient Greece's elegance and secret societies' allure. Located in the city centre, this speakeasy bar beckons to those with a taste for extraordinary adventure.",
        "Our selection of tantalizing cocktails, expertly crafted to intrigue the senses and ignite the imagination, offers something you have never tried. Crafted with the finest ingredients and a touch of magic, these libations will transport you to a world of wonder and intrigue. Our interactive service ensures that every moment spent at Pinecone Bar is an unforgettable journey, where guests become part of the narrative and the night unfolds like a thrilling tale.",
        "Stepping  through the doors of Pinecone Bar, guests are transported back in time, greeted by a mosaic floor in the entrance, reminiscent of eclectic aesthetics, and wooden stairs that lead to the second floor. The walls are adorned with artwork, stained glass, and sculptural chandeliers, creating a wonderful atmosphere.",
        "At the heart of Pinecone Bar lies a charming courtyard garden, a tranquil oasis in the bustling cityscape. Here, contemporary comforts blend with Greek charm.",
        "Pinecone Bar stands as a testament to the enduring allure of old tales, where tradition and innovation intertwines to create an unforgettable escape for the curious ones."
    ]
  },
];
</script>

<template>
  <div class="my-30">
    <PageTitle tag="h1">Welcome to Pinecone Bar</PageTitle>
  </div>
  <TextBlock :blocks="textBlocks" />
</template>

<style scoped>

</style>