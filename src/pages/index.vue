<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import TextBlock from "~/entities/TextBlock/TextBlock.vue";
import type {ITextBlock} from "~/entities/TextBlock/types/textBlock.types";

const textBlocks: ITextBlock[] = [
  {
    title: "Lucidity Triptych – A Unique Immersive Theater Experience in Belgrade",
    paragraphs: [
      "Belgrade’s cultural scene welcomes a groundbreaking immersive theater experience with the premiere of Lucidity Triptych! Set in the exclusive Pinecone Theatre—a three-story house from the early 20th century, meticulously redesigned for this occasion—each performance invites an intimate audience of just 22 spectators to step into a dreamlike world. Moving freely through the space, visitors become part of a narrative that dissolves the boundary between stage and audience.",
      "Developed over more than a year through an in-depth exploration, Lucidity Triptych introduces a bold new approach to theater in Belgrade."
    ]
  },
  {
    title: "About the Performance",
    paragraphs: [
        "Inspired by Friedrich Nietzsche’s The Birth of Tragedy and Carl Jung’s theory of archetypes, this theatrical experience leads the audience to the collision point of order and chaos, reality and dreams, performance and observation. The story follows Wilhelm, a writer approaching his forties, who, over the course of a single night and three dreams, confronts unresolved conflicts from his past and deep- seated family traumas that hinder his search for personal and creative freedom. Each spectator constructs their own sensory and emotional journey, shaping a unique perspective on the unfolding narrative",
        "The three dreams reveal different facets of the writer’s personal transformation, unfolding" +
        "simultaneously, making it physically impossible to witness the entire performance in one viewing" +
        "Audience members can choose to follow the dreamer throughout, shadow one of the dream" +
        "characters, or shift between multiple perspectives. ",
        "The first dream, Separation, explores the fragile boundary between passion and responsibility through the story of a young couple caught in the whirlwind of creative ambition and emotional dependence. The second dream, Shadows, delves into the weight of inherited family conflicts and the dark forces of the unconscious through a turbulent and painful story between a father and son. The third dream, Consequences, exposes the cost of ambition and the longing for recognition, as characters stumble over their own desires, pushing their ideals to the breaking point. Before the performance begins, each audience member receives guidance on how to navigate the narrative"
      ],
  },
  {
    title: "A Fusion of Drama and Music Theater",
    paragraphs: [
        "Lucidity Triptych blends elements of drama and musical theater, creating a multi-sensory experience that immerses the audience on every level. With a combination of composed music and instrumental improvisation, opera singers Nevena Đoković and Nevena Matić perform selections from Rusalka, Carmen, and The Tales of Hoffmann, adapted and arranged to seamlessly integrate into the narrative.",
        "The immersive format allows for heightened sensory engagement, as spectators can interact with the set and props, engage with characters, perceive different scents, and enjoy cocktails inspired by the show’s protagonists. These signature cocktails, served during the performance, will be available at the Pinecone Bar on the ground floor, further enriching the unique atmosphere of the event."
    ]
  },
  {
    title: "Creative Team & Cast",
    paragraphs: [
        "Behind Pinecone Theatre stands the production company Immersive World Production, with Alexandar Prudyan and Jovana Radovanović as the creators of the project. Lucidity Triptych is directed by Ana Bunjak, with a script by Alexandar Prudyan, adapted by Ana Bunjak and Alexandar Prudyan, production by Jovana Radovanović, and musical direction by Stefan Zekić. The set design is crafted by Aleksandar Stanković and Miloš Radovanović, with scenography consultation by Magdalena Vlajić. Costume design and visual identity are the work of artists Julija Miheeva, Luka Đuranović serves as the production coordinator, while Ratko Rakin handled the communication",
        "The cast features actors Aleksandar Kecman, Milica Majkić, Julija Graut, Andrea Đina Ržaničanin, Kristina Kika Jovanović, Vedran Borovčanin, Maksim Mićković, Uroš Petronijević, and Nikola Pavlović, alongside opera singers Nevena Đoković and Nevena Matić. Harpist Sofija Sibinović performs live music throughout the show.",
        "The performance is in English and intended for adult audiences.",
        "Don't miss the chance to experience one of the most innovative theatrical events in the region!"
    ]
  }
];
</script>


<template>
    <div class="flex flex-col items-center gap-20 my-30">
      <PageTitle tag="h1">Pinecone Theater</PageTitle>
      <PageTitle tag="h2">
        <span class="uppercase">Lucidity</span> Triptych
      </PageTitle>
    </div>
    <TextBlock :blocks="textBlocks" />
</template>

<style scoped>
.blockTitle {
  text-align: left;
  font-weight: bold;
  font-family: Inter, sans-serif;
  margin: 0;
}
</style>