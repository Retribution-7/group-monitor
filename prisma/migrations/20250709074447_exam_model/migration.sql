-- CreateTable
CREATE TABLE "ExamModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "start" TEXT NOT NULL,
    "auditorium" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "examType" TEXT NOT NULL
);
