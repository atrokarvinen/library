import { Borrowing } from "@prisma/client";
import { prisma } from "../core/prisma";

export class BorrowingService {
  getBorrowings = async (userId: number) => {
    return prisma.borrowing.findMany({
      where: { userId },
      include: {
        bookItem: { include: { book: { include: { author: true } } } },
      },
    });
  };

  getHistory = async (userId: number) => {
    return prisma.borrowingHistory.findMany({
      where: { userId },
      include: {
        bookItem: { include: { book: { include: { author: true } } } },
      },
    });
  };

  getBorrowing = async (id: number) => {
    return prisma.borrowing.findUnique({ where: { id } });
  };

  getAvailableCount = async (bookId: number) => {
    const bookItems = await prisma.bookItem.findMany({
      where: { id: bookId },
      include: { borrowing: true },
    });
    const availableCount = bookItems.filter((x) => !x.borrowing).length;
    return availableCount;
  };

  getFirstAvailable = async (bookId: number) => {
    const firstAvailableItem = await prisma.bookItem.findFirst({
      where: { bookId, borrowing: null },
    });
    return firstAvailableItem;
  };

  addBorrowing = async (borrowing: Omit<Borrowing, "id">) => {
    return prisma.borrowing.create({ data: borrowing });
  };

  updateBorrowing = async (borrowing: Borrowing) => {
    return prisma.borrowing.update({
      where: { id: borrowing.id },
      data: borrowing,
    });
  };

  deleteBorrowing = async (id: number) => {
    const deleted = await prisma.borrowing.findUnique({
      where: { id },
      include: { bookItem: true },
    });
    if (!deleted) throw new Error("Borrowing not found");
    await prisma.$transaction([
      prisma.borrowing.delete({ where: { id } }),
      prisma.borrowingHistory.create({
        data: {
          end: deleted.end,
          start: deleted.start,
          bookItemId: deleted.bookItem.id,
          userId: deleted.userId,
        },
      }),
    ]);
    return deleted;
  };
}
