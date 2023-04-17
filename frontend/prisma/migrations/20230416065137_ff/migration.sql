/*
  Warnings:

  - The primary key for the `CourseCurriculumRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CourseCurriculumRelation` table. All the data in the column will be lost.
  - You are about to drop the `_CourseToCurriculum` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `CourseCurriculumRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CourseToCurriculum` DROP FOREIGN KEY `_CourseToCurriculum_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseToCurriculum` DROP FOREIGN KEY `_CourseToCurriculum_B_fkey`;

-- AlterTable
ALTER TABLE `Course` MODIFY `article` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CourseCurriculumRelation` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `order` INTEGER NOT NULL,
    ADD PRIMARY KEY (`courseId`, `curriculumId`);

-- AlterTable
ALTER TABLE `Curriculum` MODIFY `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_CourseToCurriculum`;

-- AddForeignKey
ALTER TABLE `CourseCurriculumRelation` ADD CONSTRAINT `CourseCurriculumRelation_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCurriculumRelation` ADD CONSTRAINT `CourseCurriculumRelation_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
