/*
  Warnings:

  - Added the required column `revenue` to the `SalesInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesInvoice" ADD COLUMN     "revenue" INTEGER NOT NULL;
