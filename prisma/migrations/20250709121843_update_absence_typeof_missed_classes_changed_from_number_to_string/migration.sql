-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AbsenceModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "missedClasses" TEXT NOT NULL,
    "absenceDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_AbsenceModel" ("absenceDate", "comment", "id", "missedClasses", "status", "studentId") SELECT "absenceDate", "comment", "id", "missedClasses", "status", "studentId" FROM "AbsenceModel";
DROP TABLE "AbsenceModel";
ALTER TABLE "new_AbsenceModel" RENAME TO "AbsenceModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
