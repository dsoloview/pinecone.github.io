import prisma from "~/server/database/lib/prisma";
import type { User } from "~/server/database/prisma/generated";

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
