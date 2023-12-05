import { Borrowing } from "@prisma/client";
import { prisma } from "../core/prisma";

export class BorrowingService {
  getBorrowings = async () => {
    return prisma.borrowing.findMany();
  };

  getBorrowing = async (id: number) => {
    return prisma.borrowing.findUnique({ where: { id } });
  };

  addBorrowing = async (borrowing: Borrowing) => {
    return prisma.borrowing.create({ data: borrowing });
  };

  updateBorrowing = async (id: number, borrowing: any) => {
    return prisma.borrowing.update({ where: { id }, data: borrowing });
  };

  deleteBorrowing = async (id: number) => {
    return prisma.borrowing.delete({ where: { id } });
  };
}
