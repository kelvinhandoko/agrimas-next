-- AlterTable
ALTER TABLE "PurchaseInvoice" ADD COLUMN     "totalAfter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalBefore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalDiscount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTax" INTEGER NOT NULL DEFAULT 0;
