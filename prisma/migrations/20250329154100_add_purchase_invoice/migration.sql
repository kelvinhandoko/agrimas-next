/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `PurchasePayment` table. All the data in the column will be lost.
  - Added the required column `purchaseInvoiceId` to the `PurchasePayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PurchasePayment` DROP COLUMN `purchaseId`,
    ADD COLUMN `purchaseInvoiceId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PurchaseInvoice` (
    `id` VARCHAR(191) NOT NULL,
    `purchaseId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseInvoiceDetail` (
    `id` VARCHAR(191) NOT NULL,
    `receiveId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurchasePayment` ADD CONSTRAINT `PurchasePayment_purchaseInvoiceId_fkey` FOREIGN KEY (`purchaseInvoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoiceDetail` ADD CONSTRAINT `PurchaseInvoiceDetail_receiveId_fkey` FOREIGN KEY (`receiveId`) REFERENCES `ReceiveItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
