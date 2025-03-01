/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `InitialProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `InitialProduct_productId_key` ON `InitialProduct`(`productId`);
