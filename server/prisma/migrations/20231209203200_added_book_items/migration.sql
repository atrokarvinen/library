/*
  Warnings:

  - You are about to drop the column `count` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `libraryId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Borrowing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookItemId]` on the table `Borrowing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookItemId` to the `Borrowing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReturned` to the `Borrowing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "count",
DROP COLUMN "libraryId";

-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "bookId",
ADD COLUMN     "bookItemId" INTEGER NOT NULL,
ADD COLUMN     "isReturned" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "BookItem" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "libraryId" INTEGER NOT NULL,

    CONSTRAINT "BookItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Borrowing_bookItemId_key" ON "Borrowing"("bookItemId");

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookItem" ADD CONSTRAINT "BookItem_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookItemId_fkey" FOREIGN KEY ("bookItemId") REFERENCES "BookItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
