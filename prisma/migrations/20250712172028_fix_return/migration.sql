/*
  Warnings:

  - You are about to drop the column `totalDiscountReturn` on the `InvoiceReturn` table. All the data in the column will be lost.
  - You are about to drop the column `totalTaxReturn` on the `InvoiceReturn` table. All the data in the column will be lost.
  - You are about to drop the column `totalDiscountReturn` on the `PurchaseReturn` table. All the data in the column will be lost.
  - You are about to drop the column `totalTaxReturn` on the `PurchaseReturn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InvoiceReturn" DROP COLUMN "totalDiscountReturn",
DROP COLUMN "totalTaxReturn";

-- AlterTable
ALTER TABLE "InvoiceReturnDetail" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PurchaseReturn" DROP COLUMN "totalDiscountReturn",
DROP COLUMN "totalTaxReturn";

-- AlterTable
ALTER TABLE "PurchaseReturnDetail" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
