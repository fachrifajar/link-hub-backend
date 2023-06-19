/*
  Warnings:

  - You are about to drop the column `item_id` on the `SocialMedia` table. All the data in the column will be lost.
  - Made the column `bg_color` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `post_id` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_item_id_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bg" TEXT NOT NULL DEFAULT 'flat',
ADD COLUMN     "bg_direction" TEXT NOT NULL DEFAULT 'gradientUp',
ADD COLUMN     "button_color" TEXT NOT NULL DEFAULT '#e0e0f4',
ADD COLUMN     "button_font_color" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "button_option" TEXT NOT NULL DEFAULT 'fill',
ADD COLUMN     "font_color" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "items" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "bg_color" SET NOT NULL,
ALTER COLUMN "bg_color" SET DEFAULT '#FFFFFF';

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "item_id",
ADD COLUMN     "post_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
