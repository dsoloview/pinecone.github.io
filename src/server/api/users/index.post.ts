import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";
import { USER_CREATE_SCHEMA } from "~/shared/schema/user.schema";
import { getUserRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async (event) => {
  try {
    const userData = v.parse(USER_CREATE_SCHEMA, await readBody(event));

    userData.password = await hashPassword(userData.password);

    const userRepository = getUserRepository();
    const result = await userRepository.createUser(userData);

    return {
      id: result.id,
      email: result.email,
      name: result.name,
    };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
