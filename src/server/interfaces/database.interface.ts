import type { PrismaClient } from "~/generated/prisma";
export interface ISeeder {
  run: (prisma: PrismaClient) => Promise<void>;
}
