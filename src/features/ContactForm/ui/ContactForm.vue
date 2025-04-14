<template>
  <form @submit="onSubmit">
    <div class="lg:flex items-start justify-between flex-wrap text-white pr-4">

      <div class="w-1/2 p-2">
        <label for="firstName" class="w-full block">First name <span class="text-red-500">*</span></label>
        <input
            v-model="firstName" name="firstName" type="text" placeholder="First name here"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.firstName }}</span>
      </div>

      <div class="w-1/2 p-2">
        <label for="lastName" class="w-full block">Last name<span class="text-red-500">*</span></label>
        <input
            v-model="lastName" name="lastName" type="text" placeholder="Last name here"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.lastName }}</span>
      </div>

      <div class="w-1/2 p-2">
        <label for="email" class="w-full block">Email address<span class="text-red-500">*</span></label>
        <input
            v-model="email" name="email" type="email" placeholder="Add email"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.email }}</span>
      </div>

      <div class="w-1/2 p-2">
        <label for="subject" class="w-full block">Last name<span class="text-red-500">*</span></label>
        <input
            v-model="subject" name="subject" type="text" placeholder="How can we help you?"
            class="border border-amber-100 rounded-3xl p-2 w-full"/>
        <span  class="text-red-500">{{ errors.subject }}</span>
      </div>

      <div class="w-full p-2">
        <label for="comments" class="w-full block">Comments / Questions <span class="text-red-500">*</span></label>
        <textarea
            v-model="comments" name="comments" type="text" placeholder="Comments"
            class="border border-amber-100 rounded-3xl p-2 w-full h-28"></textarea>
        <span  class="text-red-500">{{ errors.comments }}</span>
      </div>

    </div>
    <button class="w-1/3 border border-amber-100 rounded-3xl p-2 text-amber-100 cursor-pointer">Send Message</button>
  </form>
</template>
<script setup>
import {useField, useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as zod from 'zod';

const validationSchema = toTypedSchema(
    zod.object({
      email: zod.string().min(2, {message: 'This field is required'}).email({message: 'Must be a valid email'}),
      lastName: zod.string().min(2, {message: 'This field is required'}),
      firstName: zod.string().min(2, {message: 'This field is required'}),
      subject: zod.string().min(2, {message: 'This field is required'}),
      comments: zod.string().min(5, {message: 'This field is required'}),
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