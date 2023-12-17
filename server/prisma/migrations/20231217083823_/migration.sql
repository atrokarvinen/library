/*
  Warnings:

  - You are about to drop the `Borrowing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowingHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookItemId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_userId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowingHistory" DROP CONSTRAINT "BorrowingHistory_bookItemId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowingHistory" DROP CONSTRAINT "BorrowingHistory_userId_fkey";

-- DropTable
DROP TABLE "Borrowing";

-- DropTable
DROP TABLE "BorrowingHistory";
