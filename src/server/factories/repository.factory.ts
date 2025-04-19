import { UserRepository } from "~/server/repositories/UserRepository";
import { PageRepository } from "~/server/repositories/PageRepository";
import { ContentRepository } from "~/server/repositories/ContentRepository";
import { LanguageRepository } from "~/server/repositories/LanguageRepository";

export function getUserRepository(): UserRepository {
  return new UserRepository();
}

export function getPageRepository() {
  return new PageRepository();
}

export function getContentRepository() {
  return new ContentRepository();
}

export function getLanguageRepository() {
  return new LanguageRepository();
}
