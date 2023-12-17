export type Borrowing = {
  id: number;
  end: Date;
  start: Date;

  bookId: number;
  bookItemId: number;
  userId: number;
};

export type CreateBorrowingDto = {
  bookId: number;
  bookItemId: number;
  start: Date;
  end: Date;
};
