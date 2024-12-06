/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `GroupAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Account_code_key` ON `Account`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `GroupAccount_code_key` ON `GroupAccount`(`code`);
