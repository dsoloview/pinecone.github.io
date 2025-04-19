<script setup lang="ts">
import type { PublicUser } from "~/shared/types/user";
import type { TableColumn } from "#ui/components/Table.vue";
import { getUsers } from "~/admin/widgets/AdminUsersTable/api/users";
import AdminUsersTableActions from "~/admin/widgets/AdminUsersTable/ui/AdminUsersTableActions.vue";
import UserModal from "~/admin/features/CreateUserModal/ui/UserModal.vue";
import { useUserModal } from "~/admin/features/CreateUserModal/hooks/useUserModal";

const { data, status } = await getUsers();
const userModal = useUserModal();

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

function handleCreateUser() {
  userModal.openCreate();
}
</script>

<template>
  <section class="my-5">
    <UserModal />
    <div class="flex justify-end">
      <UButton @click="handleCreateUser">Create user</UButton>
    </div>
    <UTable :data="data" :columns="columns" :loading="status === 'pending'">
      <template #actions-cell="{ row }">
        <AdminUsersTableActions :user="row.original" />
      </template>
    </UTable>
  </section>
</template>

<style scoped></style>
