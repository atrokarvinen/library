import { User } from "../login/user";
import { Book } from "./book";

export type Borrowing = {
  id: number;
  bookId: number;
  book?: Book;
  userId: number;
  user?: User;
  end: Date;
  start: Date;
};
