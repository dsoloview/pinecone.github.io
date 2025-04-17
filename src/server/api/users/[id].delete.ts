import { deleteUser } from "~/server/repositories/UserRepository";
import * as v from "valibot";

const paramsSchema = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, v.parser(paramsSchema));

  await deleteUser(id);
});
