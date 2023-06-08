-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW());

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ref_token" TEXT,
ALTER COLUMN "created_at" SET DEFAULT timezone('Asia/Jakarta', NOW());
