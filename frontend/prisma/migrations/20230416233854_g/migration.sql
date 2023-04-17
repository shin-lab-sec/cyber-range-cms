/*
  Warnings:

  - A unique constraint covering the columns `[courseId,order]` on the table `CourseCurriculumRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `courseIds` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Curriculum` MODIFY `level` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `CourseCurriculumRelation_courseId_order_key` ON `CourseCurriculumRelation`(`courseId`, `order`);
