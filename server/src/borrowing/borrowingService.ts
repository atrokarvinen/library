import { Borrowing } from "@prisma/client";
import { prisma } from "../core/prisma";

export class BorrowingService {
  getBorrowings = async (userId: number) => {
    return prisma.borrowing.findMany({
      where: { userId },
      include: { book: { include: { author: true } } },
    });
  };

  getBorrowing = async (id: number) => {
    return prisma.borrowing.findUnique({ where: { id } });
  };

  getAvailableCount = async (bookId: number) => {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new Error("Book not found");

    const borrowings = await prisma.borrowing.findMany({ where: { bookId } });
    const borrowedCount = borrowings.length;
    const availableCount = book.count - borrowedCount;
    return availableCount;
  };

  addBorrowing = async (borrowing: Borrowing) => {
    return prisma.borrowing.create({ data: borrowing });
  };

  updateBorrowing = async (borrowing: Borrowing) => {
    return prisma.borrowing.update({
      where: { id: borrowing.id },
      data: borrowing,
    });
  };

  deleteBorrowing = async (id: number) => {
    return prisma.borrowing.delete({ where: { id }, include: { book: true } });
  };
}
