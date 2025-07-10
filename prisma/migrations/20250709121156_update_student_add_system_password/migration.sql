/*
  Warnings:

  - Added the required column `systemPassword` to the `StudentModel` table without a default value. This is not possible if the table is not empty.

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
    "systemPassword" TEXT NOT NULL,
    "parents" TEXT NOT NULL
);
INSERT INTO "new_StudentModel" ("address", "email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup") SELECT "address", "email", "fathersName", "firstName", "lastName", "parents", "phone", "recordNumber", "subgroup" FROM "StudentModel";
DROP TABLE "StudentModel";
ALTER TABLE "new_StudentModel" RENAME TO "StudentModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
