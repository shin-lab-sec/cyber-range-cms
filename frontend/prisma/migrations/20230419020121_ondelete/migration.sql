-- DropForeignKey
ALTER TABLE `CourseCurriculumRelation` DROP FOREIGN KEY `CourseCurriculumRelation_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseCurriculumRelation` DROP FOREIGN KEY `CourseCurriculumRelation_curriculumId_fkey`;

-- AddForeignKey
ALTER TABLE `CourseCurriculumRelation` ADD CONSTRAINT `CourseCurriculumRelation_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCurriculumRelation` ADD CONSTRAINT `CourseCurriculumRelation_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
