/*
  Warnings:

  - You are about to drop the `Report_Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report_Account" DROP CONSTRAINT "Report_Account_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Report_Account" DROP CONSTRAINT "Report_Account_companyId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "reports" "Laporan"[];

-- DropTable
DROP TABLE "Report_Account";
