-- AlterTable
ALTER TABLE `booking` ADD COLUMN `code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payment_transaction` ADD COLUMN `transaction_no` VARCHAR(255) NULL;
