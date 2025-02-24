/*
  Warnings:

  - You are about to drop the column `nama` on the `Sales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,companyId]` on the table `Sales` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Sales_nama_companyId_key` ON `Sales`;

-- AlterTable
ALTER TABLE `Sales` DROP COLUMN `nama`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Sales_name_companyId_key` ON `Sales`(`name`, `companyId`);
