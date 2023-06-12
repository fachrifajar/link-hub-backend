/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW()),
ALTER COLUMN "updated_at" SET DEFAULT NOW() + interval '7 hour';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW()),
ALTER COLUMN "updated_at" SET DEFAULT NOW() + interval '7 hour';

-- CreateIndex
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");
