<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";
import { useUserModal } from "~/admin/features/CreateUserModal/hooks/useUserModal";
import { serverFetch } from "~/shared/utils/serverFetch";
import type { PublicUser } from "~/shared/types/user";

const userModal = useUserModal();
const { isOpen, user, isEditing, modalTitle, serverErrors } =
  storeToRefs(userModal);

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: isEditing.value
    ? v.optional(v.string())
    : v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  name: "",
  password: "",
});

const isSubmitting = ref(false);

watch(
  user,
  (newUser) => {
    if (newUser) {
      state.email = newUser.email || "";
      state.name = newUser.name || "";
      state.password = "";
    } else {
      state.email = "";
      state.name = "";
      state.password = "";
    }
    // Clear server errors when user changes
    serverErrors.value = {};
  },
  { immediate: true },
);

// Clear server errors for a field when it changes
watch(
  () => state.email,
  () => {
    if (serverErrors.value.email) delete serverErrors.value.email;
  },
);
watch(
  () => state.name,
  () => {
    if (serverErrors.value.name) delete serverErrors.value.name;
  },
);
watch(
  () => state.password,
  () => {
    if (serverErrors.value.password) delete serverErrors.value.password;
  },
);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitting.value = true;
    userModal.setServerErrors({});

    if (isEditing.value && user.value?.id) {
      const { data, error } = await serverFetch<PublicUser>(
        `/api/users/${user.value.id}`,
        {
          method: "PATCH",
          body: event.data,
        },
      );

      if (error?.fields) {
        userModal.setServerErrors(error.fields);
        return;
      }

      if (data) {
        toast.add({
          title: "Успех",
          description: "Пользователь успешно обновлен",
          color: "success",
        });

        await refreshNuxtData("users");
        userModal.close();
      }
    } else {
      const { data, error } = await serverFetch<PublicUser>("/api/users", {
        method: "POST",
        body: event.data,
      });

      if (error?.fields) {
        userModal.setServerErrors(error.fields);
        return;
      }

      if (data) {
        toast.add({
          title: "Успех",
          description: "Пользователь успешно создан",
          color: "success",
        });

        await refreshNuxtData("users");
        userModal.close();
      }
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="modalTitle"
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
        <UFormField label="Email" name="email" :error="serverErrors['email']">
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Name" name="name" :error="serverErrors['name']">
          <UInput v-model="state.name" />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
          :error="serverErrors['password']"
        >
          <UInput v-model="state.password" type="password" />
          <template v-if="isEditing" #description>
            <p class="text-xs text-gray-500">
              Leave empty if you don't want to change the password
            </p>
          </template>
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            variant="soft"
            :disabled="isSubmitting"
            @click="userModal.close()"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
          >
            {{ isEditing ? "Update" : "Create" }}
          </UButton>
        </div>
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
