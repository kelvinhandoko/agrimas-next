/*
  Warnings:

  - A unique constraint covering the columns `[journalId]` on the table `PurchaseInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[journalId]` on the table `PurchasePayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[journalId]` on the table `ReceiveItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[journalId]` on the table `SalesInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[journalId]` on the table `SalesPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PurchaseInvoice" ADD COLUMN     "journalId" TEXT;

-- AlterTable
ALTER TABLE "PurchasePayment" ADD COLUMN     "journalId" TEXT;

-- AlterTable
ALTER TABLE "ReceiveItem" ADD COLUMN     "journalId" TEXT;

-- AlterTable
ALTER TABLE "SalesInvoice" ADD COLUMN     "journalId" TEXT;

-- AlterTable
ALTER TABLE "SalesPayment" ADD COLUMN     "journalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseInvoice_journalId_key" ON "PurchaseInvoice"("journalId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasePayment_journalId_key" ON "PurchasePayment"("journalId");

-- CreateIndex
CREATE UNIQUE INDEX "ReceiveItem_journalId_key" ON "ReceiveItem"("journalId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_journalId_key" ON "SalesInvoice"("journalId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesPayment_journalId_key" ON "SalesPayment"("journalId");

-- AddForeignKey
ALTER TABLE "PurchasePayment" ADD CONSTRAINT "PurchasePayment_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiveItem" ADD CONSTRAINT "ReceiveItem_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesPayment" ADD CONSTRAINT "SalesPayment_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
