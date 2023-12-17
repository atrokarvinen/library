import { Grid } from "@mui/material";
import { Book } from "./book";
import { BookListItem } from "./bookListItem";
import { Borrowing } from "./borrowing";

type BookListProps = {
  books: Book[];
  borrowings: Borrowing[];
};

export const BookList = ({ books, borrowings }: BookListProps) => {
  return (
    <Grid data-testid="book-list" container spacing={2}>
      {books.map((book) => (
        <Grid key={book.id} item>
          <BookListItem book={book} borrowings={borrowings} />
        </Grid>
      ))}
    </Grid>
  );
};
