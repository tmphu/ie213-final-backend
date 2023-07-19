-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `house_host_id_fkey`;

-- AddForeignKey
ALTER TABLE `house` ADD CONSTRAINT `house_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
