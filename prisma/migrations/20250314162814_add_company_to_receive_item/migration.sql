/*
  Warnings:

  - Added the required column `companyId` to the `ReceiveItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReceiveItem` ADD COLUMN `companyId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ReceiveItem` ADD CONSTRAINT `ReceiveItem_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
