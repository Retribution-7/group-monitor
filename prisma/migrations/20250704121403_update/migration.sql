/*
  Warnings:

  - Added the required column `end` to the `LessonModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `LessonModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LessonModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "auditorium" TEXT NOT NULL,
    "lessonsType" TEXT NOT NULL
);
INSERT INTO "new_LessonModel" ("auditorium", "date", "id", "lessonsType", "subject", "teacher") SELECT "auditorium", "date", "id", "lessonsType", "subject", "teacher" FROM "LessonModel";
DROP TABLE "LessonModel";
ALTER TABLE "new_LessonModel" RENAME TO "LessonModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
