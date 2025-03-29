/*
  Warnings:

  - Added the required column `purchaseDetailId` to the `ReceiveItemDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReceiveItem` ADD COLUMN `totalAmount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ReceiveItemDetail` ADD COLUMN `purchaseDetailId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ReceiveItemDetail` ADD CONSTRAINT `ReceiveItemDetail_receiveId_fkey` FOREIGN KEY (`receiveId`) REFERENCES `ReceiveItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiveItemDetail` ADD CONSTRAINT `ReceiveItemDetail_purchaseDetailId_fkey` FOREIGN KEY (`purchaseDetailId`) REFERENCES `PurchaseDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
