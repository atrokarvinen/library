import { Grid } from "@mui/material";
import { Book } from "./book";
import { BookListItem } from "./bookListItem";

type BookListProps = {
  books: Book[];
};

export const BookList = ({ books }: BookListProps) => {
  return (
    <Grid data-testid="book-list" container spacing={2}>
      {books.map((book) => (
        <Grid key={book.id} item>
          <BookListItem book={book} />
        </Grid>
      ))}
    </Grid>
  );
};
