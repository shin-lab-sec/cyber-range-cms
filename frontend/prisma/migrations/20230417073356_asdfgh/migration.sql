/*
  Warnings:

  - You are about to drop the column `courseIds` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `courseIds`,
    ADD COLUMN `curriculumIds` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CourseCurriculumRelation` ALTER COLUMN `curriculumId` DROP DEFAULT;
