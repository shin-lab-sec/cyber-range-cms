-- DropForeignKey
ALTER TABLE `Curriculum` DROP FOREIGN KEY `Curriculum_userAgentId_fkey`;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_userAgentId_fkey` FOREIGN KEY (`userAgentId`) REFERENCES `UserAgent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
