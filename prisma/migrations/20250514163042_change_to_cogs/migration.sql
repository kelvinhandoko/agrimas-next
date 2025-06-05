/*
  Warnings:

  - You are about to drop the column `revenue` on the `SalesInvoice` table. All the data in the column will be lost.
  - Added the required column `cogs` to the `SalesInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesInvoice" DROP COLUMN "revenue",
ADD COLUMN     "cogs" INTEGER NOT NULL;
