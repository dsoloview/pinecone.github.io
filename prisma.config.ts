import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  earlyAccess: true,
  schema: "./src/server/database/prisma/schema.prisma",
});
