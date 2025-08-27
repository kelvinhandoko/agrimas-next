/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TRANSACTION_CATEGORY" ADD VALUE 'DEPOSIT_CUSTOMER';
ALTER TYPE "TRANSACTION_CATEGORY" ADD VALUE 'DEPOSIT_SUPPLIER';

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_accountId_key" ON "PaymentMethod"("accountId");
