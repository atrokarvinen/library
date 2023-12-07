/*
  Warnings:

  - You are about to drop the column `isbn` on the `Book` table. All the data in the column will be lost.
  - Added the required column `image` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "isbn",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "pages" INTEGER NOT NULL,
ADD COLUMN     "published" TIMESTAMP(3) NOT NULL;
