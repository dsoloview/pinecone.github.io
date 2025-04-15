<template>
  <form @submit="onSubmit">
    <div
      class="flex lg:flex-row flex-col lg:gap-0 gap-4 items-start justify-between flex-wrap text-white lg:pr-4"
    >
      <Input
          v-model="firstName"
          name="firstName"
          :label="t('contact_form.first_name.label')"
          :placeholder="t('contact_form.first_name.placeholder')"
          :error="errors.firstName"
          required
      />

      <Input
          v-model="lastName"
          name="lastName"
          :label="t('contact_form.last_name.label')"
          :placeholder="t('contact_form.last_name.placeholder')"
          :error="errors.lastName"
          required
      />

      <Input
          v-model="email"
          name="email"
          type="email"
          :label="t('contact_form.email.label')"
          :placeholder="t('contact_form.email.placeholder')"
          :error="errors.email"
          required
      />

      <Input
          v-model="subject"
          name="subject"
          :label="t('contact_form.subject.label')"
          :placeholder="t('contact_form.subject.placeholder')"
          :error="errors.subject"
          required
      />

      <div class="w-full lg:p-2 mb-2">
        <label for="comments" class="w-full block mb-2"
          >{{ t("contact_form.comments.label") }}
          <span class="text-red-500">*</span></label
        >

        <Textarea
            v-model="comments"
            name="comments"
            :label="t('contact_form.comments.label')"
            :placeholder="t('contact_form.comments.placeholder')"
            :error="errors.comments"
            required
        />

        <span class="text-red-500">{{ errors.comments }}</span>
      </div>
    </div>
    <button
      class="lg:w-1/3 w-full border border-amber-100 rounded-3xl p-2 text-amber-100"
    >
      Send Message
    </button>
  </form>
</template>
<script setup lang="ts">
import {defineRule, useField, useForm} from "vee-validate";
import { required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const { t } = useI18n();

defineRule("required", required);



const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(2, { message: t("contact_form.email.error") })
      .email({ message: "Must be a valid email" }),
    lastName: zod
      .string()
      .min(2, { message: t("contact_form.last_name.error") }),
    firstName: zod
      .string()
      .min(2, { message: t("contact_form.first_name.error") }),
    subject: zod.string().min(2, { message: t("contact_form.subject.error") }),
    comments: zod
      .string()
      .min(5, { message: t("contact_form.comments.error") }),
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email } = useField("email");
const { value: lastName } = useField("lastName");
const { value: firstName } = useField("firstName");
const { value: subject } = useField("subject");
const { value: comments } = useField("comments");

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
