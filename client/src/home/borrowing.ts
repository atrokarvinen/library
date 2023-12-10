import { User } from "../login/user";
import { BookItem } from "./book";
import { Library } from "./library";

export type Borrowing = {
  id: number;
  end: Date;
  start: Date;

  library?: Library;
  libraryId: number;

  bookId: number;
  bookItem?: BookItem;

  userId: number;
  user?: User;
};
