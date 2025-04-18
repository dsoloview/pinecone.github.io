import prisma from "~/server/database/lib/prisma";
import type { PublicUser } from "~/shared/types/user";
import type { User } from "~/generated/prisma";

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

export async function updateUser(id: number, user: Partial<User>) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: user,
  });
}
