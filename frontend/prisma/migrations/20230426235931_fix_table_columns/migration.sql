/*
  Warnings:

  - You are about to drop the column `article` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Curriculum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `article`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `url`,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Curriculum` DROP COLUMN `level`,
    ADD COLUMN `articleUrl` VARCHAR(191) NULL,
    ADD COLUMN `gitHubUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
