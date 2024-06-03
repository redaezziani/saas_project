/*
  Warnings:

  - You are about to drop the `EmployeeExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EmployeeExpense` DROP FOREIGN KEY `EmployeeExpense_employeeId_fkey`;

-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `daySalary` DOUBLE NULL,
    ADD COLUMN `monthSalary` DOUBLE NULL;

-- DropTable
DROP TABLE `EmployeeExpense`;
