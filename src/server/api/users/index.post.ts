import { createUser } from "~/server/repositories/UserRepository";
import * as v from "valibot";

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

export default defineEventHandler(async (event) => {
  const user = await readValidatedBody(event, v.parser(schema));

  user.password = await hashPassword(user.password);

  const result = await createUser(user);

  if (!result) {
    throw createError({
      status: 500,
      message: "Something went wrong",
    });
  }
});
