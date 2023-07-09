/*
  Warnings:

  - You are about to drop the column `city_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `district_id` on the `room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `review` MODIFY `comment` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `city_id`,
    DROP COLUMN `country_id`,
    DROP COLUMN `district_id`,
    ADD COLUMN `location_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `room_image` MODIFY `image` VARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `image` VARCHAR(1000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
