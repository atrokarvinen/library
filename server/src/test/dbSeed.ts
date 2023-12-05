import { prisma } from "../core/prisma";

export const seed = async () => {
  await clearData();

  const library = await prisma.library.create({ data: { name: "Library 1" } });

  await prisma.author.createMany({
    data: [{ name: "Author 1" }, { name: "Author 2" }, { name: "Author 3" }],
  });
  const authors = await prisma.author.findMany();

  await prisma.book.createMany({
    data: [
      {
        title: "Book 1",
        authorId: authors[0].id,
        isbn: "1234567890123",
        libraryId: library.id,
      },
      {
        title: "Book 2",
        authorId: authors[0].id,
        isbn: "1234567890123",
        libraryId: library.id,
      },
      {
        title: "Book 3",
        authorId: authors[1].id,
        isbn: "1234567890123",
        libraryId: library.id,
      },
    ],
  });
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
  await prisma.book.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.library.deleteMany({});
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
