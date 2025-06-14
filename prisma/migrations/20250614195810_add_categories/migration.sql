-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "baseSpirit" TEXT,
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "cocktailType" TEXT,
ADD COLUMN     "tags" TEXT[];
