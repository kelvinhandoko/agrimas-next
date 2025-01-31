/*
  Warnings:

  - A unique constraint covering the columns `[code,companyId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,companyId]` on the table `GroupAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,companyId]` on the table `SubAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Account_code_key` ON `Account`;

-- DropIndex
DROP INDEX `GroupAccount_code_key` ON `GroupAccount`;

-- CreateIndex
CREATE UNIQUE INDEX `Account_code_companyId_key` ON `Account`(`code`, `companyId`);

-- CreateIndex
CREATE UNIQUE INDEX `GroupAccount_code_companyId_key` ON `GroupAccount`(`code`, `companyId`);

-- CreateIndex
CREATE UNIQUE INDEX `SubAccount_code_companyId_key` ON `SubAccount`(`code`, `companyId`);
