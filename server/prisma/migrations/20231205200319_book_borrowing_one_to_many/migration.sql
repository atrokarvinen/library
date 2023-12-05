/*
  Warnings:

  - You are about to drop the column `borrowingId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `count` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_borrowingId_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "borrowingId",
ADD COLUMN     "count" INTEGER NOT NULL;
