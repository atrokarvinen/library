import { prisma } from "../core/prisma";

export class CatalogService {
  getBooks = async () => {
    return prisma.book.findMany({
      include: { author: true },
    });
  };

  getBookById = async (id: number) => {
    return prisma.book.findUnique({
      where: { id },
      include: { borrowings: true, author: true },
    });
  };

  addBook = async (book: any) => {
    return prisma.book.create({ data: book });
  };

  updateBook = async (id: number, book: any) => {
    return prisma.book.update({ where: { id }, data: book });
  };

  deleteBook = async (id: number) => {
    return prisma.book.delete({ where: { id } });
  };
}
