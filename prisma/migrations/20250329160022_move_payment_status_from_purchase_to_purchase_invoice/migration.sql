/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Purchase` DROP COLUMN `paymentStatus`;

-- AlterTable
ALTER TABLE `PurchaseInvoice` ADD COLUMN `paymentStatus` ENUM('PAID', 'UNPAID', 'PARTIAL') NOT NULL DEFAULT 'UNPAID';
