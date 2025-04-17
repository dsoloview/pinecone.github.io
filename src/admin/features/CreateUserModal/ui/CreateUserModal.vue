<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";
import { useCreateUserModal } from "~/admin/features/CreateUserModal/hooks/useCreateUserModal";

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

const { isOpen, close } = useCreateUserModal();
type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  name: "",
  password: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/users", {
    method: "POST",
    body: event.data,
  });

  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });

  close();
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Create user"
    :ui="{
      body: 'flex justify-center items-center gap-4',
    }"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Name" name="name">
          <UInput v-model="state.name" type="name" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>
h2 {
  font-size: inherit;
  line-height: inherit;
}
</style>
