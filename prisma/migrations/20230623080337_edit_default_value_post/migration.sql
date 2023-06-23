/*
  Warnings:

  - The `use_title` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "button_option" SET DEFAULT 'fill-50px',
DROP COLUMN "use_title",
ADD COLUMN     "use_title" BOOLEAN NOT NULL DEFAULT true;
