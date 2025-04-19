import * as v from "valibot";
import type { User } from "~/generated/prisma";
import { handleServerError } from "~/server/handlers/handleServerError";
import { ID_PARAM_SCHEMA } from "~/shared/schema/params.schema";
import { USER_UPDATE_SCHEMA } from "~/shared/schema/user.schema";
import { getUserRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async (event) => {
  try {
    const { id } = v.parse(ID_PARAM_SCHEMA, getRouterParams(event));

    const userData = v.parse(USER_UPDATE_SCHEMA, await readBody(event));

    const updateData: Partial<User> = {
      email: userData.email,
      name: userData.name,
    };

    if (userData.password) {
      updateData.password = await hashPassword(userData.password);
    }

    const userRepository = getUserRepository();

    const updatedUser = await userRepository.updateUser(id, updateData);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
