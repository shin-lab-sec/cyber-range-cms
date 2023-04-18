/*
  Warnings:

  - You are about to drop the column `order` on the `CourseCurriculumRelation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `CourseCurriculumRelation_courseId_order_key` ON `CourseCurriculumRelation`;

-- AlterTable
ALTER TABLE `CourseCurriculumRelation` DROP COLUMN `order`;
