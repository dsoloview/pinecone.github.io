<script setup lang="ts">
import type { PublicUser } from "~/server/types/user";
import type { DropdownMenuItem } from "#ui/components/DropdownMenu.vue";
import { useConfirm } from "~/admin/entities/AdminConfirm/hooks/useConfirm";

type Props = {
  user: PublicUser;
};

const { confirm } = useConfirm();
const { user } = defineProps<Props>();

const toast = useToast();

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
            action: () => {
              $fetch(`/api/users/${user.id}`, {
                method: "DELETE",
              });
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
    />
  </UDropdownMenu>
</template>

<style scoped></style>
