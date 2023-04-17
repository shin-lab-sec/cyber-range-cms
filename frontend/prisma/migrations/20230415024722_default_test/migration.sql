/*
  Warnings:

  - The primary key for the `Sample` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Sample` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The required column `username` was added to the `Sample` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Sample` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0.99,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
