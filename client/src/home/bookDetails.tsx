import {
  Box,
  Button,
  CircularProgress,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { axios } from "../core/axios";
import { Book } from "./book";
import { Borrowing } from "./borrowing";

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

  const borrowBook = async () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 14);
    const borrowing: Omit<Borrowing, "id" | "userId"> = {
      bookId: id,
      end,
      start,
    };
    const response = await axios.post(`/borrowings`, borrowing);
    console.log("created borrowing:", response.data);

    await getBook();
  };

  if (!book) {
    return (
      <Box sx={{ margin: "auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  const available = book.count - book.borrowings.length;

  return (
    <div>
      <h1>Book details</h1>
      <dl>
        <dt>Title</dt>
        <dd>{book.title}</dd>
        <dt>Author</dt>
        <dd>{book.author?.name ?? "N/A"}</dd>
        <dt>ISBN</dt>
        <dd>{book.isbn}</dd>
        <dt>Available</dt>
        <dd>
          <span>{available}</span>
          <span>/</span>
          <span>{book.count}</span>
        </dd>
      </dl>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={borrowBook}>
          Borrow
        </Button>
        <MuiLink component={Link} to="/" underline="none">
          <Button variant="contained" color="secondary">
            Go back
          </Button>
        </MuiLink>
      </Stack>
    </div>
  );
};
