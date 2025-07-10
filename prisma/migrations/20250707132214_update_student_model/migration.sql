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
    "parents" TEXT NOT NULL
);
INSERT INTO "new_StudentModel" ("email", "fathersName", "firstName", "id", "lastName", "parents", "phone", "recordNumber", "subgroup") SELECT "email", "fathersName", "firstName", "id", "lastName", "parents", "phone", "recordNumber", "subgroup" FROM "StudentModel";
DROP TABLE "StudentModel";
ALTER TABLE "new_StudentModel" RENAME TO "StudentModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
