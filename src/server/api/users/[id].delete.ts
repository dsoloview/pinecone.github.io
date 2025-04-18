import { deleteUser } from "~/server/repositories/UserRepository";
import * as v from "valibot";
import { handleServerError } from "~/server/handlers/handleServerError";

const paramsSchema = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const { id } = v.parse(paramsSchema, params);

    await deleteUser(id);
    return { success: true };
  } catch (err: Error | unknown) {
    handleServerError(err);
  }
});
