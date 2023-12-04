import { Card, Grid, Link as MuiLink } from "@mui/material";
import { Book } from "../catalog/book";

type BookListProps = {
  books: Book[];
};

export const BookList = ({ books }: BookListProps) => {
  // return (
  //   <ul>
  //     {books.map((book) => (
  //       <li key={book.id}>
  //         <span>{book.title}</span>
  //       </li>
  //     ))}
  //   </ul>
  // );
  return (
    <Grid container gap={2}>
      {books.map((book) => (
        <Grid item key={book.id}>
          <MuiLink href={`/books/${book.id}`} underline="none">
            <Card>
              <dl>
                <dt>Title</dt>
                <dd>{book.title}</dd>
                <dt>Author</dt>
                <dd>{book.authorId}</dd>
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
