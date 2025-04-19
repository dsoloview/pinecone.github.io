import * as v from "valibot";

export const USER_CREATE_SCHEMA = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
});

export const USER_UPDATE_SCHEMA = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  password: v.optional(v.string()),
});
