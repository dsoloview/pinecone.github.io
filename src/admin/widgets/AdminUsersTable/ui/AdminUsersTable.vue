<script setup lang="ts">
import type { PublicUser } from "~/server/types/user";
import type { TableColumn } from "#ui/components/Table.vue";
import { getUsers } from "~/admin/widgets/AdminUsersTable/api/users";
import AdminUsersTableActions from "~/admin/widgets/AdminUsersTable/ui/AdminUsersTableActions.vue";

const { data, status } = await getUsers();

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
  <UTable
    class="my-5"
    :data="data"
    :columns="columns"
    :loading="status === 'pending'"
  >
    <template #actions-cell="{ row }">
      <AdminUsersTableActions :user="row.original" />
    </template>
  </UTable>
</template>

<style scoped></style>
