import { Author } from "./author";
import { Borrowing } from "./borrowing";
import { Library } from "./library";

export type Book = {
  id: number;
  title: string;
  isbn: string;

  authorId: number;
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
  isbn: "",
  libraryId: 0,
  borrowings: [],
  count: 0,
};
