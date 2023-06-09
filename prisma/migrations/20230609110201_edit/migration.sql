/*
  Warnings:

  - Made the column `updated_at` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW()),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT NOW() + interval '7 hour';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW()),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT NOW() + interval '7 hour';
