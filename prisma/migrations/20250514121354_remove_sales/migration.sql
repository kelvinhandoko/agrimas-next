/*
  Warnings:

  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_companyId_fkey";

-- DropTable
DROP TABLE "Sales";
