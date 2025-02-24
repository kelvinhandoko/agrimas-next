-- CreateTable
CREATE TABLE `Sales` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `deleted` DATETIME(3) NULL,

    UNIQUE INDEX `Sales_nama_companyId_key`(`nama`, `companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
