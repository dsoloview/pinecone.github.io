<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  layout: false,
});
const { fetch: refreshSession } = useUserSession();
const credentials = reactive({
  email: "",
  password: "",
});
async function login() {
  $fetch("/api/login", {
    method: "POST",
    body: credentials,
  })
    .then(async () => {
      await refreshSession();
      await navigateTo("/admin");
    })
    .catch(() => alert("Bad credentials"));
}
</script>

<template>
  <form @submit.prevent="login">
    <input
      v-model="credentials.email"
      type="email"
      placeholder="Email"
      autocomplete="email"
    />
    <input
      v-model="credentials.password"
      type="password"
      placeholder="Password"
      autocomplete="current-password"
    />
    <button type="submit">Login</button>
  </form>
</template>
