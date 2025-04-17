import type { PublicUser } from "~/server/types/user";

export async function getUsers() {
  return useFetch<PublicUser[]>("/api/users/users");
}
