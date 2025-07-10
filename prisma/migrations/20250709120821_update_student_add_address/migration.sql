/*
  Warnings:

  - Made the column `address` on table `StudentModel` required. This step will fail if there are existing NULL values in that column.

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
    "address" TEXT NOT NULL,
    "parents" TEXT NOT NULL
);
INSERT INTO "new_StudentModel" ("address", "email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup") SELECT "address", "email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup" FROM "StudentModel";
DROP TABLE "StudentModel";
ALTER TABLE "new_StudentModel" RENAME TO "StudentModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
