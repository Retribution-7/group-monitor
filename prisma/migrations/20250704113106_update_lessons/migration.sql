/*
  Warnings:

  - Added the required column `lessonsType` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "auditorium" TEXT NOT NULL,
    "lessonsType" TEXT NOT NULL
);
INSERT INTO "new_Lesson" ("auditorium", "date", "id", "subject", "teacher") SELECT "auditorium", "date", "id", "subject", "teacher" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
