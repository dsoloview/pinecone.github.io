export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (to.path === "/admin/auth" && loggedIn.value) {
    return navigateTo("/admin");
  }

  if (to.path === "/admin/auth") return;

  if (!loggedIn.value) {
    return navigateTo("/admin/auth");
  }
});
