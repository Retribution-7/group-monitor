/*
  Warnings:

  - You are about to drop the column `repeatType` on the `LessonModel` table. All the data in the column will be lost.
  - Added the required column `weekType` to the `LessonModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LessonModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weekDay" TEXT NOT NULL,
    "weekType" TEXT NOT NULL,
    "subgroup" INTEGER,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "auditorium" TEXT NOT NULL,
    "lessonsType" TEXT NOT NULL
);
INSERT INTO "new_LessonModel" ("auditorium", "end", "id", "lessonsType", "start", "subgroup", "subject", "teacher", "weekDay") SELECT "auditorium", "end", "id", "lessonsType", "start", "subgroup", "subject", "teacher", "weekDay" FROM "LessonModel";
DROP TABLE "LessonModel";
ALTER TABLE "new_LessonModel" RENAME TO "LessonModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
