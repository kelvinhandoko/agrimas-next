/*
  Warnings:

  - You are about to drop the column `TotalSold` on the `SoldProduct` table. All the data in the column will be lost.
  - Added the required column `totalSold` to the `SoldProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoldProduct" DROP COLUMN "TotalSold",
ADD COLUMN     "totalSold" INTEGER NOT NULL;
