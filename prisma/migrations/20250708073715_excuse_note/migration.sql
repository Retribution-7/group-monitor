-- CreateTable
CREATE TABLE "ExcuseNoteModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "noteNumber" INTEGER NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "illnessStart" DATETIME NOT NULL,
    "illnessEnd" DATETIME NOT NULL,
    "physicalEducationStart" DATETIME NOT NULL,
    "physicalEducationEnd" DATETIME NOT NULL
);
