<script setup lang="ts">
import * as v from "valibot";
import { serverFetch } from "~/shared/utils/serverFetch";

type FormState = {
  email: string;
  password: string;
};

definePageMeta({
  middleware: ["authenticated"],
  layout: false,
});

const schema = computed(() => {
  return v.object({
    email: v.pipe(v.string(), v.email("Invalid email")),
    password: v.pipe(
      v.string(),
      v.minLength(8, "Must be at least 8 characters"),
    ),
  });
});

const { fetch: refreshSession } = useUserSession();

const state = reactive<FormState>({
  email: "",
  password: "",
});
const serverErrors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
async function onSubmit() {
  try {
    isSubmitting.value = true;
    const { error } = await serverFetch("/api/login", {
      method: "POST",
      body: state,
    });

    if (error?.fields) {
      serverErrors.value = error.fields;
      return;
    }

    await refreshSession();
    await navigateTo("/admin");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <UCard class="w-full max-w-md shadow-lg">
      <template #header>
        <h2 class="text-xl font-bold">Login</h2>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email" :error="serverErrors['email']">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
          :error="serverErrors['password']"
        >
          <UInput v-model="state.password" class="w-full" type="password" />
        </UFormField>

        <div class="flex justify-end gap-2 mt-6">
          <UButton
            type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            block
          >
            Войти
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
