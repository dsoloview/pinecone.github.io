<script setup lang="ts">
import PageTitle from "~/entities/PageTitle/PageTitle.vue";
import * as v from "valibot";
import { ErrorMessage, Field } from "vee-validate";

definePageMeta({
  name: "private-event",
});

const schema = v.object({
  firstName: v.string(),
  lastName: v.string(),
  email: v.pipe(v.string(), v.email()),
});
const { t } = useI18n();
</script>

<template>
  <div class="my-30">
    <PageTitle class="small" tag="h1">{{
      t("pages.private-event.title")
    }}</PageTitle>
  </div>
  <Form :validation-schema="schema">
    <Field name="firstName" />
    <ErrorMessage name="firstName" />
    <Field name="lastName" />
    <ErrorMessage name="lastName" />
    <Field name="email" />
    <ErrorMessage name="email" />
  </Form>
</template>

<style scoped>
@reference '../../assets/scss/main.css';

.small {
  @apply text-5xl md:text-9xl;
}
</style>
