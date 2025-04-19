import * as v from "valibot";

export const ID_PARAM_SCHEMA = v.object({
  id: v.pipe(v.string(), v.transform(Number)),
});
