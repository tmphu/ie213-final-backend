/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `host` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `host` table. All the data in the column will be lost.
  - Made the column `user_id` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `host` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `host` DROP FOREIGN KEY `host_user_id_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- AlterTable
ALTER TABLE `host` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
