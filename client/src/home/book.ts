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

  libraryId: number;
  library?: Library;

  count: number;
  borrowings: Borrowing[];
};

export const defaultBook: Book = {
  id: 0,
  title: "",
  authorId: 0,
  image: "",
  published: new Date(),
  pages: 0,

  libraryId: 0,
  borrowings: [],
  count: 0,
};
