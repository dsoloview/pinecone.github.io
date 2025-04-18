<script setup lang="ts">
import type { PublicUser } from "~/shared/types/user";
import type { DropdownMenuItem } from "#ui/components/DropdownMenu.vue";
import { useConfirm } from "~/admin/entities/AdminConfirm/hooks/useConfirm";
import { useUserModal } from "~/admin/features/CreateUserModal/hooks/useUserModal";
import { serverFetch } from "~/shared/utils/serverFetch";

type Props = {
  user: PublicUser;
};

const { confirm } = useConfirm();
const userModal = useUserModal();
const { user } = defineProps<Props>();

const toast = useToast();
const isDeleting = ref(false);

const dropDownActions: Ref<DropdownMenuItem[][]> = computed(() => {
  return [
    [
      {
        label: "Copy user Id",
        icon: "i-lucide-copy",
        onSelect: () => {
          navigator.clipboard.writeText(user.id.toString());
          toast.add({
            title: "User ID copied to clipboard!",
            color: "success",
            icon: "i-lucide-circle-check",
          });
        },
      },
    ],
    [
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          userModal.openUpdate(user);
        },
      },
      {
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          confirm({
            title: "Are you sure?",
            message: "This action cannot be undone!",
            label: "Delete",
            action: async () => {
              isDeleting.value = true;

              try {
                await serverFetch(`/api/users/${user.id}`, {
                  method: "DELETE",
                });

                await refreshNuxtData("users");
              } finally {
                isDeleting.value = false;
              }
            },
          });
        },
      },
    ],
  ];
});
</script>

<template>
  <UDropdownMenu :items="dropDownActions">
    <UButton
      icon="i-lucide-ellipsis-vertical"
      color="neutral"
      variant="ghost"
      aria-label="Actions"
      :disabled="isDeleting"
    />
  </UDropdownMenu>
</template>

<style scoped></style>
