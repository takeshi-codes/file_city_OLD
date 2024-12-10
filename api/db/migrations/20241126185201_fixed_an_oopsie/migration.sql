/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "hashedPassword",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
DROP COLUMN "salt";
