/*
  Warnings:

  - You are about to drop the column `name` on the `UserModel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "fathersName" TEXT,
    "birthday" DATETIME,
    "phone" TEXT,
    "groupe" TEXT,
    "course" INTEGER,
    "address" TEXT
);
INSERT INTO "new_UserModel" ("email", "id", "password") SELECT "email", "id", "password" FROM "UserModel";
DROP TABLE "UserModel";
ALTER TABLE "new_UserModel" RENAME TO "UserModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
