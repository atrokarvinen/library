import { BookItem } from "./book";
import { Borrowing } from "./borrowing";

export const getAvailableCount = (
  bookItems: BookItem[],
  borrowings: Borrowing[]
) => {
  const borrowedItems = borrowings.map((borrowing) => borrowing.bookItemId);
  return bookItems.filter((item) => !borrowedItems.includes(item.id)).length;
};
