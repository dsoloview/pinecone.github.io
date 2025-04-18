import * as v from "valibot";
import { updateUser } from "~/server/repositories/UserRepository";
import type { User } from "~/generated/prisma";
import { handleServerError } from "~/server/handlers/handleServerError";

const paramsSchema = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.optional(v.string()),
});

export default defineEventHandler(async (event) => {
  try {
    const { id } = v.parse(paramsSchema, getRouterParams(event));

    const userData = v.parse(schema, await readBody(event));

    const updateData: Partial<User> = {
      email: userData.email,
      name: userData.name,
    };

    if (userData.password) {
      updateData.password = await hashPassword(userData.password);
    }

    const updatedUser = await updateUser(id, updateData);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
