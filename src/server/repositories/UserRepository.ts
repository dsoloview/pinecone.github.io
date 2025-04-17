import prisma from "~/server/database/lib/prisma";
import type { User } from "~/server/database/prisma/generated";
import type { PublicUser } from "~/server/types/user";

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function getAllUsers(): Promise<PublicUser[]> {
  return prisma.user.findMany({
    omit: {
      password: true,
    },
  });
}

export async function createUser(user: Omit<User, "id">) {
  return prisma.user.create({
    data: user,
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
}
