-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "alternativeIngredients" JSONB,
ADD COLUMN     "bestServedWith" TEXT;
