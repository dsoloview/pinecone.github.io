<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { user, clear: clearSession } = useUserSession();

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Pages",
      to: "/admin/pages",
      icon: "i-carbon-document",
    },
    {
      label: "Users",
      to: "/admin/users",
      icon: "i-carbon-user",
    },
  ],
  [
    {
      label: user.value?.name,
      icon: "i-carbon-user",
    },
  ],
  [
    {
      label: "WebSite",
      icon: "i-carbon-launch",
      to: "/",
    },
    {
      label: "Logout",
      icon: "i-carbon-logout",
      as: "button",
      onSelect: logout,
    },
  ],
]);

async function logout() {
  await clearSession();
  await navigateTo("/admin/auth");
}
</script>

<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    orientation="horizontal"
    :items="items"
    class="p-2 data-[orientation=horizontal]:border-b border-(--ui-border) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
  />
</template>
