import { getAllUsers } from "~/server/repositories/UserRepository";

export default defineEventHandler(async () => {
  return getAllUsers();
});
