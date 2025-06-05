/*
  Warnings:

  - The values [PAJAK_DIBAYAR_DIMUKA,PEMBAYARAN_PEMBELIAN,PAJAK_PENGHASILAN] on the enum `TRANSACTION_CATEGORY` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `companyId` to the `PurchasePayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TRANSACTION_CATEGORY_new" AS ENUM ('PERSEDIAAN', 'PENJUALAN', 'RETUR_PENJUALAN', 'DISKON_PENJUALAN', 'PEMBAYARAN_PENJUALAN', 'PEMBELIAN', 'RETUR_PEMBELIAN', 'DISKON_PEMBELIAN', 'LABA_DITAHAN', 'EKUITAS', 'PIUTANG_USAHA', 'HUTANG_USAHA', 'HPP', 'PPN_MASUKAN', 'PPN_KELUARAN');
ALTER TABLE "DefaultAccount" ALTER COLUMN "category" TYPE "TRANSACTION_CATEGORY_new" USING ("category"::text::"TRANSACTION_CATEGORY_new");
ALTER TYPE "TRANSACTION_CATEGORY" RENAME TO "TRANSACTION_CATEGORY_old";
ALTER TYPE "TRANSACTION_CATEGORY_new" RENAME TO "TRANSACTION_CATEGORY";
DROP TYPE "TRANSACTION_CATEGORY_old";
COMMIT;

-- AlterTable
ALTER TABLE "PurchasePayment" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GeneralLedger" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "journalDetailId" TEXT NOT NULL,
    "runningBalance" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "GeneralLedger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchasePayment" ADD CONSTRAINT "PurchasePayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralLedger" ADD CONSTRAINT "GeneralLedger_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralLedger" ADD CONSTRAINT "GeneralLedger_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralLedger" ADD CONSTRAINT "GeneralLedger_journalDetailId_fkey" FOREIGN KEY ("journalDetailId") REFERENCES "JournalDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
