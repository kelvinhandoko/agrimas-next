/*
  Warnings:

  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ErrorLog" DROP CONSTRAINT "ErrorLog_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ErrorLog" DROP CONSTRAINT "ErrorLog_userId_fkey";

-- DropTable
DROP TABLE "ErrorLog";
