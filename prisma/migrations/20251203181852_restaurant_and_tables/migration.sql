-- CreateTable
CREATE TABLE "restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
