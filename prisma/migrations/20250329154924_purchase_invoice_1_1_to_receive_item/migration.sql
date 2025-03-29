/*
  Warnings:

  - You are about to drop the `PurchaseInvoiceDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiveId` to the `PurchaseInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PurchaseInvoiceDetail` DROP FOREIGN KEY `PurchaseInvoiceDetail_receiveId_fkey`;

-- AlterTable
ALTER TABLE `PurchaseInvoice` ADD COLUMN `receiveId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `PurchaseInvoiceDetail`;

-- AddForeignKey
ALTER TABLE `PurchaseInvoice` ADD CONSTRAINT `PurchaseInvoice_receiveId_fkey` FOREIGN KEY (`receiveId`) REFERENCES `ReceiveItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
