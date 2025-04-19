import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";
import { InvalidCredentials } from "~/server/errors/InvalidCredentials";
import { LOGIN_SCHEMA } from "~/shared/schema/login.schema";
import { getUserRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async (event) => {
  try {
    const userRepository = getUserRepository();
    const { email, password } = v.parse(LOGIN_SCHEMA, await readBody(event));

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await verifyPassword(user.password, password))) {
      throw new InvalidCredentials();
    }

    await setUserSession(event, {
      user: {
        name: user.name,
      },
    });

    return {};
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
