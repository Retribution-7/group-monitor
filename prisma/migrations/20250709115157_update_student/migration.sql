/*
  Warnings:

  - The primary key for the `StudentModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StudentModel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentModel" (
    "recordNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fathersName" TEXT NOT NULL,
    "subgroup" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "parents" TEXT NOT NULL
);
INSERT INTO "new_StudentModel" ("email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup") SELECT "email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup" FROM "StudentModel";
DROP TABLE "StudentModel";
ALTER TABLE "new_StudentModel" RENAME TO "StudentModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
