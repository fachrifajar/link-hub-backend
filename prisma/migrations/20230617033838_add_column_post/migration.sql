/*
  Warnings:

  - You are about to drop the column `item_id` on the `SocialMedia` table. All the data in the column will be lost.
  - Added the required column `post_id` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_item_id_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "items" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "item_id",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
