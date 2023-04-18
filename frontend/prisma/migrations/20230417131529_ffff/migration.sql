/*
  Warnings:

  - You are about to drop the `Anpan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post3` DROP FOREIGN KEY `Post3_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile2` DROP FOREIGN KEY `Profile2_userId_fkey`;

-- DropTable
DROP TABLE `Anpan`;

-- DropTable
DROP TABLE `Post3`;

-- DropTable
DROP TABLE `Profile2`;

-- DropTable
DROP TABLE `Sample`;

-- DropTable
DROP TABLE `User2`;

-- DropTable
DROP TABLE `User3`;
