export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (to.path === "/admin/auth") return;

  if (!loggedIn.value) {
    return navigateTo("/admin/auth");
  }
});
