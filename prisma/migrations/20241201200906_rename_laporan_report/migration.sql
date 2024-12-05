/*
  Warnings:

  - You are about to drop the column `laporan` on the `Report_Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,report,accountId]` on the table `Report_Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report` to the `Report_Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report_Account` DROP COLUMN `laporan`,
    ADD COLUMN `report` ENUM('NERACA', 'PERUBAHAN_MODAL', 'LABA_RUGI') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Report_Account_companyId_report_accountId_key` ON `Report_Account`(`companyId`, `report`, `accountId`);
