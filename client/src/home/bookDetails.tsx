import { Box, Button, CircularProgress, Link as MuiLink } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Book } from "../catalog/book";
import { axios } from "../core/axios";

export const BookDetails = () => {
  const routeParams = useParams();
  const id = Number(routeParams.id);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    getBook();
  }, [id]);

  const getBook = async () => {
    const response = await axios.get<Book>(`/books/${id}`);
    setBook(response.data);
  };

  if (!book) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1>Book details</h1>
      <dl>
        <dt>Title</dt>
        <dd>{book.title}</dd>
        <dt>Author</dt>
        <dd>{book.authorId}</dd>
        <dt>ISBN</dt>
        <dd>{book.isbn}</dd>
      </dl>
      <MuiLink component={Link} to="/" underline="none">
        <Button variant="contained">Go back</Button>
      </MuiLink>
    </div>
  );
};
