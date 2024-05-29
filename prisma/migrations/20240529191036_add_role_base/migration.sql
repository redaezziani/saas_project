-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('admin', 'client', 'guest') NOT NULL DEFAULT 'guest';
