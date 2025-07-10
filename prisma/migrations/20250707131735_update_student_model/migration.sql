/*
  Warnings:

  - You are about to drop the column `parentName` on the `StudentModel` table. All the data in the column will be lost.
  - You are about to drop the column `parentPhone` on the `StudentModel` table. All the data in the column will be lost.
  - Added the required column `parents` to the `StudentModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subgroup` to the `StudentModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordNumber" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fathersName" TEXT NOT NULL,
    "subgroup" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "parents" JSONB NOT NULL
);
INSERT INTO "new_StudentModel" ("email", "fathersName", "firstName", "id", "lastName", "phone", "recordNumber") SELECT "email", "fathersName", "firstName", "id", "lastName", "phone", "recordNumber" FROM "StudentModel";
DROP TABLE "StudentModel";
ALTER TABLE "new_StudentModel" RENAME TO "StudentModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
