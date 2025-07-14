-- DropForeignKey
ALTER TABLE "InvoiceReturn" DROP CONSTRAINT "InvoiceReturn_customerId_fkey";

-- AddForeignKey
ALTER TABLE "InvoiceReturn" ADD CONSTRAINT "InvoiceReturn_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
