import { Card, Grid, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { Book } from "./book";

type BookListProps = {
  books: Book[];
};

export const BookList = ({ books }: BookListProps) => {
  return (
    <Grid container gap={2}>
      {books.map((book) => (
        <Grid item key={book.id}>
          <MuiLink component={Link} to={`/books/${book.id}`} underline="none">
            <Card>
              <dl>
                <dt>Title</dt>
                <dd>{book.title}</dd>
                <dt>Author</dt>
                <dd>{book.author?.name ?? "N/A"}</dd>
                <dt>ISBN</dt>
                <dd>{book.isbn}</dd>
              </dl>
            </Card>
          </MuiLink>
        </Grid>
      ))}
    </Grid>
  );
};
