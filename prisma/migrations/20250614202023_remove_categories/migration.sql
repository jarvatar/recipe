/*
  Warnings:

  - You are about to drop the column `categories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "categories",
DROP COLUMN "tags",
ADD COLUMN     "adjective" TEXT,
ADD COLUMN     "season" TEXT;
