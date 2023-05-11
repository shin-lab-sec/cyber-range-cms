/*
  Warnings:

  - Added the required column `userAgentId` to the `Curriculum` table without a default value. This is not possible if the table is not empty.
  - Made the column `gitHubUrl` on table `Curriculum` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Curriculum` ADD COLUMN `userAgentId` VARCHAR(191) NOT NULL,
    MODIFY `gitHubUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserAgent` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gitHubUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserAgent_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_userAgentId_fkey` FOREIGN KEY (`userAgentId`) REFERENCES `UserAgent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
