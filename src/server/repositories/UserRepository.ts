import prisma from "~/server/database/lib/prisma";
import type { PublicUser } from "~/shared/types/user";
import type { User } from "~/generated/prisma";

export class UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getAllUsers(): Promise<PublicUser[]> {
    return prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async createUser(user: Omit<User, "id">) {
    return prisma.user.create({
      data: user,
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async updateUser(id: number, user: Partial<User>) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  }
}
