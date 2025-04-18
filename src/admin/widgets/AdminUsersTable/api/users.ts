import { useAsyncData } from "#app";
import type { PublicUser } from "~/shared/types/user";

export async function getUsers() {
  return useAsyncData<PublicUser[]>("users", () =>
    $fetch<PublicUser[]>("/api/users"),
  );
}
