import { prisma } from "../core/prisma";

export class CatalogService {
  getBooks = async () => {
    return prisma.book.findMany({
      include: {
        author: true,
        bookItems: true,
      },
    });
  };

  getBookById = async (id: number) => {
    return prisma.book.findUnique({
      where: { id },
      include: {
        bookItems: { include: { library: true } },
        author: true,
      },
    });
  };

  getBookItemsByBook = async (id: number) => {
    return prisma.bookItem.findMany({ where: { bookId: id } });
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
