<script setup lang="ts">
import type { PublicUser } from "~/server/types/user";
import type { TableColumn } from "#ui/components/Table.vue";
import { getUsers } from "~/admin/widgets/AdminUsersTable/api/users";
import AdminUsersTableActions from "~/admin/widgets/AdminUsersTable/ui/AdminUsersTableActions.vue";
import { useCreateUserModal } from "~/admin/features/CreateUserModal/hooks/useCreateUserModal";
import CreateUserModal from "~/admin/features/CreateUserModal/ui/CreateUserModal.vue";

const { data, status } = await getUsers();
const { open } = useCreateUserModal();
const columns: TableColumn<PublicUser>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
</script>

<template>
  <section class="my-5">
    <CreateUserModal />
    <div class="flex justify-end">
      <UButton @click="open">Create user</UButton>
    </div>
    <UTable :data="data" :columns="columns" :loading="status === 'pending'">
      <template #actions-cell="{ row }">
        <AdminUsersTableActions :user="row.original" />
      </template>
    </UTable>
  </section>
</template>

<style scoped></style>
