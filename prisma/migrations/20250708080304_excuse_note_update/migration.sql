-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExcuseNoteModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "noteNumber" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "illnessStart" DATETIME NOT NULL,
    "illnessEnd" DATETIME NOT NULL,
    "physicalEducationStart" DATETIME NOT NULL,
    "physicalEducationEnd" DATETIME NOT NULL
);
INSERT INTO "new_ExcuseNoteModel" ("id", "illnessEnd", "illnessStart", "issueDate", "noteNumber", "physicalEducationEnd", "physicalEducationStart", "studentId") SELECT "id", "illnessEnd", "illnessStart", "issueDate", "noteNumber", "physicalEducationEnd", "physicalEducationStart", "studentId" FROM "ExcuseNoteModel";
DROP TABLE "ExcuseNoteModel";
ALTER TABLE "new_ExcuseNoteModel" RENAME TO "ExcuseNoteModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
