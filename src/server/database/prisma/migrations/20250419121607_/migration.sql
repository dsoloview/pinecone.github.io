/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Translation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    CONSTRAINT "Content_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Content_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
