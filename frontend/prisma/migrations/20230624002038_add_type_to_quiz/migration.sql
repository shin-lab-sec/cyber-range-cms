/*
  Warnings:

  - The `answer` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "type" VARCHAR(255) NOT NULL,
DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT[];
