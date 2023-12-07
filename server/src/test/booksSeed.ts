import { Book } from "@prisma/client";

type BookSeed = Omit<Book, "id" | "authorId" | "libraryId"> & {
  authorName: string;
};

export const booksData: BookSeed[] = [
  {
    title: "The Catcher in the Rye",
    image: "the_catcher_in_the_rye.jpg",
    published: new Date("1951-07-16"),
    pages: 224,
    authorName: "J.D. Salinger",
    count: 2,
  },
  {
    title: "Pride and Prejudice",
    authorName: "Jane Austen",
    image: "pride_and_prejudice.jpg",
    published: new Date("1813-01-28"),
    pages: 432,
    count: 3,
  },
  {
    title: "To Kill a Mockingbird",
    authorName: "Harper Lee",
    image: "to_kill_a_mockingbird.jpg",
    published: new Date("1960-07-11"),
    pages: 281,
    count: 1,
  },
  {
    title: "1984",
    authorName: "George Orwell",
    image: "1984.jpg",
    published: new Date("1949-06-08"),
    pages: 328,
    count: 5,
  },
  {
    title: "The Great Gatsby",
    authorName: "F. Scott Fitzgerald",
    image: "the_great_gatsby.jpg",
    published: new Date("1925-04-10"),
    pages: 180,
    count: 10,
  },
  {
    title: "Moby-Dick",
    authorName: "Herman Melville",
    image: "moby_dick.jpg",
    published: new Date("1851-10-18"),
    pages: 720,
    count: 6,
  },
  {
    title: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    image: "the_hobbit.jpg",
    published: new Date("1937-09-21"),
    pages: 310,
    count: 15,
  },
  {
    title: "The Lord of the Rings",
    authorName: "J.R.R. Tolkien",
    image: "the_lord_of_the_rings.jpg",
    published: new Date("1954-07-29"),
    pages: 1178,
    count: 3,
  },
  {
    title: "The Alchemist",
    image: "the_alchemist.jpg",
    published: new Date("1988-01-01"),
    pages: 208,
    authorName: "Paulo Coelho",
    count: 7,
  },
];
