/*
  Warnings:

  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_areaId_fkey";

-- DropTable
DROP TABLE "Area";

-- CreateTable
CREATE TABLE "area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
