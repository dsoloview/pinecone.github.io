<template>
  <form @submit="onSubmit">
    <div class="flex lg:flex-row flex-col lg:gap-0 gap-4 items-start justify-between flex-wrap text-white lg:pr-4">

      <div class="lg:w-1/2 w-full lg:p-2 ">
        <label for="firstName" class="w-full block mb-2">{{ t('contact_form.first_name.label') }} <span class="text-red-500">*</span></label>
        <input
            v-model="firstName" name="firstName" type="text"  :placeholder="$t('contact_form.first_name.placeholder')"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.firstName }}</span>
      </div>

      <div class="lg:w-1/2 w-full lg:p-2">
        <label for="lastName" class="w-full block mb-2">{{ t('contact_form.last_name.label') }}<span class="text-red-500">*</span></label>
        <input
            v-model="lastName" name="lastName" type="text" :placeholder="$t('contact_form.last_name.placeholder')"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.lastName }}</span>
      </div>

      <div class="lg:w-1/2 w-full lg:p-2">
        <label for="email" class="w-full block mb-2">{{ t('contact_form.email.label') }}<span class="text-red-500">*</span></label>
        <input
            v-model="email" name="email" type="email" :placeholder="$t('contact_form.email.placeholder')"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.email }}</span>
      </div>

      <div class="lg:w-1/2 w-full lg:p-2">
        <label for="subject" class="w-full block mb-2">{{ t('contact_form.subject.label') }}<span class="text-red-500">*</span></label>
        <input
            v-model="subject" name="subject" type="text" :placeholder="$t('contact_form.subject.placeholder')"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.subject }}</span>
      </div>

      <div class="w-full lg:p-2 mb-2">
        <label for="comments" class="w-full block mb-2">{{ t('contact_form.comments.label') }} <span class="text-red-500">*</span></label>
        <textarea
            v-model="comments" name="comments" type="text" :placeholder="$t('contact_form.comments.placeholder')"
            class="border border-amber-100 rounded-3xl p-2 w-full h-28"></textarea>
        <span  class="text-red-500">{{ errors.comments }}</span>
      </div>

    </div>
    <button class="lg:w-1/3 w-full border border-amber-100 rounded-3xl p-2 text-amber-100 ">Send Message</button>
  </form>
</template>
<script setup>
import {useField, useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as zod from 'zod';
const { t } = useI18n();
const validationSchema = toTypedSchema(
    zod.object({
      email: zod.string().min(2, {message: t('contact_form.email.error') }).email({message: 'Must be a valid email'}),
      lastName: zod.string().min(2, {message: t('contact_form.last_name.error') }),
      firstName: zod.string().min(2, {message: t('contact_form.first_name.error') }),
      subject: zod.string().min(2, {message: t('contact_form.subject.error') }),
      comments: zod.string().min(5, {message: t('contact_form.comments.error') }),
    })
);
const {handleSubmit, errors} = useForm({
  validationSchema,
});
const {value: email} = useField('email');
const {value: lastName} = useField('lastName');
const {value: firstName} = useField('firstName');
const {value: subject} = useField('subject');
const {value: comments} = useField('comments');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>