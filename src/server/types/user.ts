import type { User } from "~/server/database/prisma/generated";

export type PublicUser = Omit<User, "password">;
