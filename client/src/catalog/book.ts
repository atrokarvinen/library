export type Book = {
  id: number;
  title: string;
  authorId: number;
  isbn: string;
  libraryId: number;
};

export const defaultBook: Book = {
  id: 0,
  title: "",
  authorId: 0,
  isbn: "",
  libraryId: 0,
};
