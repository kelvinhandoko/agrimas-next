/*
  Warnings:

  - You are about to drop the column `ppn_percent` on the `PurchaseDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PurchaseDetail" DROP COLUMN "ppn_percent",
ADD COLUMN     "discount_percent" INTEGER NOT NULL DEFAULT 0;
