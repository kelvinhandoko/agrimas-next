-- AlterTable
ALTER TABLE `Account` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Company` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ErrorLog` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `GroupAccount` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Journal` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `JournalDetail` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Report_Account` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SubAccount` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Supplier` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User_Company` ADD COLUMN `deleted` DATETIME(3) NULL;
