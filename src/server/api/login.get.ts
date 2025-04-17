import * as v from "valibot";
import { findUserByEmail } from "~/server/repositories/UserRepository";

const schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
});
export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, v.parser(schema));

  const user = await findUserByEmail(email);
  if (!user) {
    throw createError({
      status: 401,
      message: "Invalid credentials",
    });
  }

  if (!(await verifyPassword(user.password, password))) {
    throw createError({
      status: 401,
      message: "Invalid credentials",
    });
  }

  await setUserSession(event, {
    user: {
      name: user.name,
    },
  });

  return {};
});
