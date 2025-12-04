/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "table" ADD COLUMN     "areaId" TEXT;

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_slug_key" ON "restaurant"("slug");

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
