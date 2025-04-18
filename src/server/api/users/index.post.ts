import { createUser } from "~/server/repositories/UserRepository";
import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

export default defineEventHandler(async (event) => {
  try {
    const userData = v.parse(schema, await readBody(event));

    userData.password = await hashPassword(userData.password);

    const result = await createUser(userData);

    return {
      id: result.id,
      email: result.email,
      name: result.name,
    };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
