import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";
import { ID_PARAM_SCHEMA } from "~/shared/schema/params.schema";
import { getUserRepository } from "~/server/factories/repository.factory";

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const { id } = v.parse(ID_PARAM_SCHEMA, params);

    const userRepository = getUserRepository();
    await userRepository.deleteUser(id);
    return { success: true };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
