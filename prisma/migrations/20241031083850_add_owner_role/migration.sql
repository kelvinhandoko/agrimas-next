-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('OWNER', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER';
