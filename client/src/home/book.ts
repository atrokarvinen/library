import { Author } from "./author";
import { Borrowing } from "./borrowing";
import { Library } from "./library";

export type Book = {
  id: number;
  title: string;
  image?: string;
  published: Date;
  pages: number;

  authorId: number;
  authorName?: string;
  author?: Author;

  bookItems: BookItem[];
};

export type BookItem = {
  id: number;

  bookId: number;
  book: Book;

  libraryId: number;
  library: Library;

  borrowing?: Borrowing;
};

export const defaultBook: Book = {
  id: 0,
  title: "",
  authorId: 0,
  image: "",
  published: new Date(),
  pages: 0,

  bookItems: [],
};
