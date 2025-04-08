<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import type {ITextBlock} from "~/entities/TextBlock/types/textBlock.types";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";

const textBlocks: ITextBlock[] = [
  {
    paragraphs: [
        "Immersive theater transcends traditional stage boundaries to offer a groundbreaking approach to storytelling. Here, the line between performer and audience blurs, allowing you to step inside the story and become an essential part of its unfolding. As you enter our immersive space, you are not just stepping into a venue; you are stepping into the narrative itself, surrounded by a world meticulously crafted to captivate all your senses.",
        "Each visit promises a unique journey. In this interactive realm, the story envelopes you, inviting you to navigate through vivid scenes, interact with characters, and sometimes even alter the storyline. This level of engagement is designed to forge a personal connection with the narrative, transforming each performance into a distinct, memorable adventure.",
        "Our actors navigate the space around and with you, creating a fluid and dynamic performance that makes you a co-creator of the unfolding drama. This intense interaction deepens the emotional impact, making every reaction and interaction feel genuine and impactful. You are encouraged to touch, taste, and fully immerse yourself in the environment, which heightens the sensory experience and ensures that no two visits are alike.",
        "The unpredictable nature of immersive theater means that each performance is unique, shaped by the collective actions and decisions of its participants. The storyline adapts in real-time, responding to its audience—turning the theater into a living, responsive experience. This dynamic form of entertainment not only entertains but also invites you to step outside your usual boundaries, explore uncharted territories, and gain fresh perspectives.",
        "In immersive theater, you don’t just watch a story—you live it. Join us for an experience that extends beyond viewing, touching the core of your senses and emotions, and leaving you with an unforgettable imprint of the tales we tell."
    ]
  },
];
</script>

<template>
  <div class="my-30">
    <PageTitle tag="h1">Immersivity</PageTitle>
  </div>
  <TextBlock :blocks="textBlocks" />
</template>

<style scoped>

</style>