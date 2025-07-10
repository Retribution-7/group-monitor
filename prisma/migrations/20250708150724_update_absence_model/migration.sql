/*
  Warnings:

  - Added the required column `missedClasses` to the `AbsenceModel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AbsenceModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "missedClasses" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_AbsenceModel" ("comment", "date", "id", "status", "studentId") SELECT "comment", "date", "id", "status", "studentId" FROM "AbsenceModel";
DROP TABLE "AbsenceModel";
ALTER TABLE "new_AbsenceModel" RENAME TO "AbsenceModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
