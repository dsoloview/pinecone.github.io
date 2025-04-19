<script setup lang="ts">
import type * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";
import { useUserModal } from "~/admin/features/CreateUserModal/hooks/useUserModal";
import { serverFetch } from "~/shared/utils/serverFetch";
import type { PublicUser } from "~/shared/types/user";
import {
  USER_CREATE_SCHEMA,
  USER_UPDATE_SCHEMA,
} from "~/shared/schema/user.schema";

type FormState = {
  email: string;
  name: string;
  password: string;
};

const userModal = useUserModal();
const { isOpen, user, isEditing, modalTitle, serverErrors } =
  storeToRefs(userModal);
const toast = useToast();

const isSubmitting = ref(false);

const schema = computed(() => {
  return isEditing.value ? USER_UPDATE_SCHEMA : USER_CREATE_SCHEMA;
});

type Schema = v.InferOutput<typeof schema.value>;

const state = reactive<FormState>({
  email: "",
  name: "",
  password: "",
});

watch(
  user,
  (newUser) => {
    resetForm(newUser);
    clearAllServerErrors();
  },
  { immediate: true },
);

type FormStateKey = keyof FormState;
const formStateKeys = Object.keys(state) as FormStateKey[];

formStateKeys.forEach((field) => {
  watch(
    () => state[field],
    () => clearServerError(field),
  );
});

function resetForm(newUser: Partial<PublicUser> | null) {
  state.email = newUser?.email || "";
  state.name = newUser?.name || "";
  state.password = "";
}

function clearServerError(field: keyof FormState) {
  if (serverErrors.value[field]) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete serverErrors.value[field];
  }
}

function clearAllServerErrors() {
  userModal.setServerErrors({});
}

function showSuccessToast(action: string) {
  toast.add({
    title: "Success",
    description: `User was successfully ${action}`,
    color: "success",
  });
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitting.value = true;
    clearAllServerErrors();

    if (isEditing.value && user.value?.id) {
      await updateUser(user.value.id.toString(), event.data);
    } else {
      await createUser(event.data);
    }
  } finally {
    isSubmitting.value = false;
  }
}

async function updateUser(userId: string, data: Schema) {
  const { data: userData, error } = await serverFetch<PublicUser>(
    `/api/users/${userId}`,
    {
      method: "PATCH",
      body: data,
    },
  );

  if (error?.fields) {
    userModal.setServerErrors(error.fields);
    return;
  }

  if (userData) {
    showSuccessToast("updated");
    await refreshNuxtData("users");
    userModal.close();
  }
}

async function createUser(data: Schema) {
  const { data: userData, error } = await serverFetch<PublicUser>(
    "/api/users",
    {
      method: "POST",
      body: data,
    },
  );

  if (error?.fields) {
    userModal.setServerErrors(error.fields);
    return;
  }

  if (userData) {
    showSuccessToast("updated");
    await refreshNuxtData("users");
    userModal.close();
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
