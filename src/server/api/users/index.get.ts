import { getUserRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async () => {
  const userRepository = getUserRepository();

  return userRepository.getAllUsers();
});
