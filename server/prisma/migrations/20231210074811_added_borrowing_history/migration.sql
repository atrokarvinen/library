/*
  Warnings:

  - You are about to drop the column `isReturned` on the `Borrowing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "isReturned";

-- CreateTable
CREATE TABLE "BorrowingHistory" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "bookItemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BorrowingHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowingHistory" ADD CONSTRAINT "BorrowingHistory_bookItemId_fkey" FOREIGN KEY ("bookItemId") REFERENCES "BookItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowingHistory" ADD CONSTRAINT "BorrowingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
