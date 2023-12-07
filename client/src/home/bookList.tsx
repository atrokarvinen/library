import { Grid } from "@mui/material";
import { Book } from "./book";
import { BookListItem } from "./bookListItem";

type BookListProps = {
  books: Book[];
};

export const BookList = ({ books }: BookListProps) => {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid key={book.id} item xs={12} md={6} xl={3}>
          <BookListItem book={book} />
        </Grid>
      ))}
    </Grid>
  );
};
