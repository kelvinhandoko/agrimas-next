-- DropForeignKey
ALTER TABLE "InvoiceReturnDetail" DROP CONSTRAINT "InvoiceReturnDetail_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReturnDetail" DROP CONSTRAINT "PurchaseReturnDetail_companyId_fkey";

-- AlterTable
ALTER TABLE "InvoiceReturnDetail" ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseReturnDetail" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseReturnDetail" ADD CONSTRAINT "PurchaseReturnDetail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceReturnDetail" ADD CONSTRAINT "InvoiceReturnDetail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
