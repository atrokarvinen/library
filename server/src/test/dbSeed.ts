import { prisma } from "../core/prisma";
import { booksData } from "./booksSeed";

export const seed = async () => {
  await clearData();

  const librariesToCreate = [
    "Meadowbrook Heights Library",
    "Serene Haven Public Library",
    "Evergreen Valley Reading Center",
  ].map((name) => ({ name }));
  await prisma.library.createMany({ data: librariesToCreate });
  const libraries = await prisma.library.findMany();

  const authorNames = booksData.map((book) => book.authorName);
  const distinctAuthorNames = Array.from(new Set(authorNames)).map((name) => ({
    name,
  }));

  await prisma.author.createMany({ data: distinctAuthorNames });
  const authors = await prisma.author.findMany();

  const booksToCreate = booksData.map((book) => {
    const authorName = book.authorName;
    delete (book as any).authorName;
    return {
      ...book,
      authorId: authors.find((x) => x.name === authorName)!.id,
      libraryId: libraries[Math.floor(Math.random() * libraries.length)].id,
    };
  });
  await prisma.book.createMany({ data: booksToCreate });
  const books = await prisma.book.findMany();

  await prisma.user.createMany({
    data: [
      { name: "User 1", password: "test" },
      { name: "User 2", password: "test" },
    ],
  });
  const users = await prisma.user.findMany();

  await prisma.borrowing.createMany({
    data: [
      {
        bookId: books[0].id,
        userId: users[0].id,
        end: new Date(),
        start: new Date(),
      },
      {
        bookId: books[1].id,
        userId: users[1].id,
        end: new Date(),
        start: new Date(),
      },
    ],
  });
};

export const clearData = async () => {
  await prisma.borrowing.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.library.deleteMany({});
  await prisma.user.deleteMany({});
};

export const printAll = async () => {
  const books = await prisma.book.findMany();
  console.log("books:", books);
  const authors = await prisma.author.findMany();
  console.log("authors:", authors);
  const libraries = await prisma.library.findMany();
  console.log("libraries:", libraries);
  const users = await prisma.user.findMany();
  console.log("users:", users);
  const borrowings = await prisma.borrowing.findMany();
  console.log("borrowings:", borrowings);
};
