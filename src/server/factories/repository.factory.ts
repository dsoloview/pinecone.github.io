import { UserRepository } from "~/server/repositories/UserRepository";
import { PageRepository } from "~/server/repositories/PageRepository";

export function getUserRepository(): UserRepository {
  return new UserRepository();
}

export function getPageRepository() {
  return new PageRepository();
}
