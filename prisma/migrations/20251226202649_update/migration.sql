/*
  Warnings:

  - Made the column `passwordHash` on table `AdminUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdminUser" ALTER COLUMN "passwordHash" SET NOT NULL;
