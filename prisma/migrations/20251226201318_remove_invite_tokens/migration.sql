/*
  Warnings:

  - You are about to drop the `AdminInviteToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminInviteToken" DROP CONSTRAINT "AdminInviteToken_adminId_fkey";

-- DropTable
DROP TABLE "AdminInviteToken";
